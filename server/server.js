var express = require('express')
var app = express()
var spawn = require("child_process").spawn;
const schedule = require('node-schedule');
//const fs = require('fs');
const fs = require('fs').promises;

app.use(express.urlencoded())
app.use(express.json())
message = ""

const SerialPort = require('serialport')
const port = new SerialPort('/dev/ttyUSB0')


// port.write('3\n', function(err) {
//   if (err) {
//     return console.log('Error on write: ', err.message)
//   }
//   console.log('message written')
// })

// Open errors will be emitted as an error event
port.on('error', function(err) {
  console.log('Error: ', err.message)
})


//#region function helpers

//#endregion

//#region variables
var env_data = {
    water: 0,
};


var state = {
    lamp: false,
    should_lamp: false,
    gate_closed: false,
    air: true,
    hour_on: 5,
    hour_off: 23,
    light_in_progress: false,
    to_light_on: 0,
    watering: false,
    need_update: false,
}

var globals = {
    humidity: [500, 500, 500],
    hour_on: 5,
    hour_off: 23, 
    water_can: 4.0,
    hum_prob: 5,
    lowest_hum: 355,
    auto_watering: false,
}

const light_off_rule = new schedule.RecurrenceRule();

const light_on_rule = new schedule.RecurrenceRule();

var light_on_job = null;

var light_off_job = null;

var water_control = null;
var env_interval = null;

//#endregion
  
//#region startup

(async function(){
    await startup()
})()


port.on('data', function (data) {
    s = data.toString()
    message += s;
    if(s.endsWith('\n'))
    {   
        try{
        j = JSON.parse(message)
        // console.log(j)
        env_data = {...env_data, ...j};
            // console.log(env_data)
            //console.log(env_data)
        if(state.gate_closed && globals.auto_watering && !state.watering)
            hum_sensor.check_humidity(); 

        if(state.watering){
            if(env_data.water >= globals.water_can){
                state.watering = false;
                env_data.water = 0;
                arduino.water_off();
                spawn('python', ['stop_pump.py'])
            } 
        }

        }catch(err){

        }
        message = ""
    }
    // console.log('Data:', data.toString('utf8'))
  })

async function startup(){

    spawn('python', ['prepare.py'])
    await init_globals()


    light_off_rule.hour = globals.hour_off;
    light_on_rule.hour = globals.hour_on;
    light_off_job = schedule.scheduleJob(light_off_rule, function(){
        check_time();
        apply_state();
    });
    light_on_job = schedule.scheduleJob(light_on_rule, function(){
        check_time();
        apply_state();
    });
    console.log("ustawiono fotoperiod")

    water_control = setInterval(water_f, 300)
    env_interval = setInterval(getEnvData, 3000)

}
//#endregion


//#region database

async function init_globals(){
    data = await fs.readFile(require.resolve('./var/variables.json')).catch(console.error)
    if(data){
        data = JSON.parse(data)
        if(JSON.stringify(data) === '{}'){
            state.need_update = true;
            updateDatabse();
            console.log("utworzono domyslne dane srodowiskowe")
        }else{
        globals = data
        console.log("dane srodowiskowe załadowane")
        }
    }
      
}


function updateDatabse(){
    fs.writeFile("./var/variables.json", JSON.stringify(globals), function(err) {
        if(err) {
            return console.log(err);
        }else{
            state.need_update = false;
        }
        console.log("The file was saved!");
    }); 
}

//#endregion



function getEnvData(){
process = spawn('python', ['weather_board.py', 'i2c-1'])

process.stdout.on('data', function (data) {
    env_data = {...env_data, ...JSON.parse(data)}
    

})
}

var hum_sensor = {

    check_humidity: function(){
        
        if(env_data.middle > -globals.humidity[1]) 
        {
        
            arduino.water_on();
            state.watering = true;
            console.log("watering started")
            spawn('python', ['run_pump.py'])
            
        }
            
    },
}


var arduino = {
    process: null,
    
    water_off: function() {
        port.write("0");
    },
    water_on: function() {
        port.write("1");
    },
    get_flow_data: () =>{
        port.write("2");

    },
    get_hum_data: function() {
        port.write("3");
        
        
    }
}


function water_f(){
    if(state.gate_closed){
        if(!state.watering)
        {
            arduino.get_hum_data()
        }else
        {
            arduino.get_flow_data()
            
        }
    }
    
}



var light_switcher = {
    handle: 0,
    closing_date: 0,
    seconds_to_light: 0,
    to_close: function(){
        if(this.handle){
            if(Math.round(10 - (new Date() - this.closing_date )/1000) >= 0)
                this.seconds_to_light =  Math.round(10 - (new Date() - this.closing_date )/1000);
            else this.seconds_to_light = 0;
        }else{
            this.seconds_to_light = 0;
        }
    },
    on: function() {
        this.off();
        state.light_in_progress = true;
        this.handle = setTimeout(()=>{
            spawn('python', ['light_on.py'])
            state.lamp = true;
            state.light_in_progress = false;
        }, 10000);
        
        this.closing_date = new Date();
    },
    off: function() {
        if (this.handle) {
            state.light_in_progress = false;
            clearTimeout(this.handle);
            this.handle = 0;
            this.closing_date = 0;
        }
    }
};


function check_time(){
    cur_date = new Date();
    light_off = new Date();
    light_on = new Date();
    light_off.setHours(globals.hour_off,0,0);
    light_on.setHours(globals.hour_on,0,0);
    if(cur_date >= light_on && cur_date < light_off){
        state.should_lamp = true;
    }else{
        state.should_lamp = false;
    }
}


function apply_state(){
    if(state.should_lamp){
        light_switcher.on();
        
    }else{
        spawn('python', ['light_off.py'])
        state.lamp = false;

    }

    if(state.gate_closed){
        spawn('python', ['close.py'])
    }else{
        spawn('python', ['open.py'])
    }

}

//zmiana fotoperiod
function reshedule(){
    light_off_rule.hour = globals.hour_off;
    light_on_rule.hour = globals.hour_on;
    light_on_job.reschedule(light_on_rule);
    light_off_job.reschedule(light_off_rule);

}

function setHumLevel(){
    if(env_data.middle){
        globals.humidity = [1000, -env_data.middle, 1000]
        updateDatabse()
        console.log("Humidity level set")
        return 1
    }else{
        return 0
    }
}
function setWetLevel(){
    globals.lowest_hum = -env_data.middle
    updateDatabse()
    console.log("Humidity level set (wet)")
    return 1
}
function startWatering(){
    state.watering = true;
    state.gate_closed = true;
    console.log("watering started")
    arduino.water_on();
    spawn('python', ['run_pump.py'])
}

function stopWatering(){
    state.watering = false;
    env_data.water = 0;
    arduino.water_off()
    spawn('python', ['stop_pump.py'])
    
}

//server part////////////////////////////////////////////////////////////////////

app.listen(3000, function(){
    console.log('running on port 3000')
})

app.use(express.static("./"))

app.get('/open', function(req, res){
    state.gate_closed = false
    state.should_lamp = false;
    state.light_in_progress = false;
    light_switcher.off();
    apply_state();
    
    res.redirect("/")
})

app.get('/close', function(req, res){
    state.gate_closed = true;
    check_time();
    apply_state();
    res.redirect("/")
})
app.get('/getState', function(req, res){
    if(state.light_in_progress){
        light_switcher.to_close();
        state.to_light_on = light_switcher.seconds_to_light;
    }
   
    res.send({...state, ...env_data, ...globals, ... {left:100, right:100}, "middle":-env_data.middle});
    //console.log({...state, ...env_data, ...globals,  ...{left:100, right:100},"middle":-env_data.middle})
    //console.log("no")
    //res.redirect("/")
})

app.get('/change', function(req, res){
    // reshedule();
    light_switcher.to_close();
    console.log(light_switcher.seconds_to_light)
    res.redirect("/")
})

app.get('/setHum', function(req, res){
    if(setHumLevel())
    res.send("OK")
    else
    res.send("ERR")
})
app.get('/startWatering', function(req, res){
    if(!state.watering)
    startWatering();
    res.send("OK")
   
})
app.get('/stopWatering', function(req, res){
    stopWatering();
    res.send("OK")
})
app.post('/setAutoWatering', function(req, res){
    globals.auto_watering = req.body.switch;
    console.log("Auto-watering: " + globals.auto_watering)
    updateDatabse()
    res.send("OK")
})
app.get('/setWet', function(req, res){
    if(setWetLevel())
    res.send("OK")
    else
    res.send("ERR")
})

app.post('/reshedule', function(req, res){
    globals.hour_off = req.body.hour_off
    globals.hour_on = req.body.hour_on
    globals.water_can = req.body.water

    reshedule();
    check_time();
    apply_state();
    updateDatabse();
    console.log("reshedule completed")
    res.send("OK")
    //res.redirect("/")
})

