
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons'
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Alert,
  Image,
  Switch
} from 'react-native';


const ddns = "http://wielkichuj.ddns.net"

const Drawer = createDrawerNavigator();

const HumMeter = ({min, max, current}) =>{
  const [offset, setOffset] = useState()

useEffect(() => {
  if(current >= max)
    setOffset("0%")
 else if(current <= min)
 setOffset("95%")
  else
  setOffset((100-Math.min(Math.round((current-min)/(max-min)*100), 95))+ "%")
  //console.log(Math.round((current-min)/(max-min)*100))
  //console.log(current, min, max)
})
    


  return(
  <View style={{flex:1,marginHorizontal: 40, marginVertical: 40,  justifyContent:"flex-end", marginTop:60}}>
    <View style={{marginLeft: offset, width:30}}>
      <Text>{-current}%</Text>
    <Icon name="caret-down-outline" size={20} />
    </View>
    <Image style={{height:20,  borderRadius: 20}} source=
{{uri:"data:image/png;base64,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 AElFTkSuQmCC"}} />
    
  </View>
  )
}


const Home = ({navigation}) =>{
  const [state, setState] = useState();
  useEffect(() =>{
    const interval = setInterval(()=>{
    
    fetch(ddns + "/getState", {method: "GET"})
    .catch((err)=>{
      console.log("growbox offline")
    })
    .then((response) =>response.json())
    .then((json) =>{
      //console.log(json);
      setState(json)
    })
      
    
    }
    , 1000);
    return () => clearInterval(interval);
  }, [])
  

  return (
    <View style={styles.container}>
      <View style={{width:40, padding:5}}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={{width:50, height:50}}>
          <Icon name="menu-outline" size={30}/>
        </TouchableOpacity>
      </View>
      {state?
      <View style={{...styles.stateContainer}}>
        
        <View style={{flex:1, paddingHorizontal:20, paddingVertical:20, alignItems: "center"}}>
        <View style={{height:50, flexDirection:"row", justifyContent: "space-between", alignItems:"center"}}>
          <View style={{flex:1, alignItems: "center"}}>
            {state.lamp?<Icon name="bulb" size={30}/>:<Icon name="bulb-outline" size={30}/>}
          </View>
          <View style={{flexDirection:"row", justifyContent:"flex-start",  flex:1}}>
            <Text style={{fontSize:15, color:"black", textAlign:"left"}}>{state.light_in_progress?state.to_light_on : (state.lamp? "on": "off")} </Text>
          </View>
        </View>
        
        <View style={{ height:50, flexDirection:"row", justifyContent: "space-between", alignItems:"center"}}>
          <View style={{flex:1, alignItems:"center"}}>
          {state.gate_closed? <Icon name="lock-closed-outline" size={30}/> : <Icon name="lock-open-outline" size={30}/>}
          </View>
          <View style={{flexDirection:"row", justifyContent:"flex-start",  flex:1}}>
            <Text style={{fontSize:15, color:"black", textAlign:"left"}}>{state.gate_closed?"closed":"opened"}</Text>
          </View>
        </View>
        
        <View style={{height:50, flexDirection:"row", justifyContent: "space-between", alignItems:"center"}}>
          <View style={{flex:1, alignItems: "center"}}>
            <Icon name="sunny-outline" size={30}/>
          </View>
          <View style={{flexDirection:"row", justifyContent:"flex-start",  flex:1}}>
          <Text style={{fontSize:15, color:"black", textAlign:"left"}}>{state.hour_on}-{state.hour_off}</Text>
          </View>
        </View>
        <View style={{height:50, flexDirection:"row", justifyContent: "space-between", alignItems:"center"}}>
          <View style={{flex:1, alignItems: "center"}}>
            <Icon name="cloud-done-outline" size={30}/>
          </View>
          <View style={{flexDirection:"row", justifyContent:"flex-start",  flex:1}}>
          <Text style={{fontSize:15, color:"black", textAlign:"left"}}>{state.auto_watering ? "auto": "manual"}</Text>
          </View>
        </View>

        </View>
        

        <View style={{flex:1, paddingHorizontal:20, paddingVertical:20, alignItems:"center"}}>
        <View style={{ height:50, flexDirection:"row", justifyContent: "space-between", alignItems:"center"}}>
          <View style={{flex:1, alignItems: "center"}}>
            <Icon name="thermometer-outline" size={30}/>
          </View>
          <View style={{flexDirection:"row", justifyContent:"flex-start",  flex:1}}>
            <Text style={{fontSize:15, color:"black", textAlign:"left"}}>{state.temp}°C</Text>
          </View>
        </View>
        
        <View style={{ height:50, flexDirection:"row", justifyContent: "space-between", alignItems:"center"}}>
          <View style={{flex:1, alignItems: "center"}}>
            <Icon name="flashlight-outline" size={30}/>
          </View>
          <View style={{flexDirection:"row", justifyContent:"flex-start",  flex:1}}>
            <Text style={{fontSize:15, color:"black", textAlign:"left"}}>{state.lux}</Text>
          </View>
        </View>
        
        <View style={{ height:50, flexDirection:"row", justifyContent: "space-between", alignItems:"center"}}>
          <View style={{flex:1, alignItems: "center"}}>
            <Icon name="water-outline" size={30}/>
          </View>
          <View style={{flexDirection:"row", justifyContent:"flex-start",  flex:1}}>
            <Text style={{fontSize:15, color:"black", textAlign:"left"}}>{state.hum}%</Text>
          </View>
        </View>
        
        <View style={{ height:50, flexDirection:"row", justifyContent: "space-between", alignItems:"center"}}>
          <View style={{flex:1, alignItems:"center"}}>
          {!state.watering? <Icon name="partly-sunny-outline" size={30}/> : <Icon name="rainy-outline" size={30}/>}
          </View>
          <View style={{flexDirection:"row", justifyContent:"flex-start",  flex:1}}>
            <Text style={{fontSize:15, color:"black", textAlign:"left"}}>{state.watering?state.water+"L":"sunny"}</Text>
          </View>
        </View>
        </View>
          
      </View>
      :null}


      {state ? 
      <HumMeter min={state.lowest_hum} max={Math.min(state.humidity[0], state.humidity[1], state.humidity[2])} current={Math.min(state.left, state.middle, state.right)}/>
      :null}
    {state ?
    <View style={{flex:1, flexDirection:"row"}}>
        <TouchableOpacity style={{width:"50%",  paddingVertical:10, height: 100, alignItems:"center", justifyContent: "center"}} onPress={() =>{fetch(ddns + "/startWatering", {method: "GET"})}}>
          <View style={{borderWidth:1, borderColor:"gray", borderRadius:20, width: 50, height: 50, alignItems:"center", justifyContent:"center"}}>
          {state.watering ? <Icon name="cloud-download" size={30} color="#2acaea"/>
          :
          <Icon name="cloud-download-outline" size={30} color="black"/>
          }
        </View>
        </TouchableOpacity>
        <TouchableOpacity style={{width:"50%",  paddingVertical:10, height: 100, alignItems:"center", justifyContent: "center"}} onPress={() =>{fetch(ddns + "/stopWatering", {method: "GET"})}}>
          <View style={{borderWidth:1, borderColor:"gray", borderRadius:20, width: 50, height: 50, alignItems:"center", justifyContent:"center"}}>
          <Icon name="cloud-offline-outline" size={30}/>
        </View>
        </TouchableOpacity>
    </View>
    :null}

      <View style={{flex:2, flexDirection:"row"}}>
      <TouchableOpacity style={{width:"50%",  paddingVertical:10, height: 100, alignItems:"center", justifyContent: "center"}} onPress={() =>{fetch(ddns + "/open", {method: "GET"})}}>
        <View style={{borderWidth:1, borderColor:"gray", borderRadius:20, width: 90, height: 90, alignItems:"center", justifyContent:"center"}}>
        <Icon name="lock-open-outline" size={50}/>
      </View>
      </TouchableOpacity>
      <TouchableOpacity style={{width:"50%",  paddingVertical:10, height: 100, alignItems:"center", justifyContent: "center"}} onPress={() =>{fetch(ddns + "/close", {method: "GET"})}}>
        <View style={{borderWidth:1, borderColor:"gray", borderRadius:20, width: 90, height: 90, alignItems:"center", justifyContent:"center"}}>
        <Icon name="lock-closed-outline" size={50}/>
      </View>
      </TouchableOpacity>
      </View>
    </View>
  )
}

const Counter = ({num, color, inc, dec}) =>{

  return(
    <View>
        <View style={styles.counter}>
          <TouchableOpacity style={{...styles.counterButton, borderRadius:10, width:50, height:50, alignItems:"center", justifyContent:"center"}} onPress={() =>dec()}>
            <Icon name="remove-outline" size={30} color="black" />
          </TouchableOpacity>
          <View style={{...styles.num_holder}}>
            <Text style={{color:"black",fontSize:20}}>{num}</Text>
          </View>
          <TouchableOpacity style={{...styles.counterButton, borderRadius:10, width:50, height:50, alignItems:"center", justifyContent:"center"}} onPress={() =>inc()}>
            <Icon name="add-outline" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
  )
}

const Settings = ({navigation}) =>{
  const [light_on, setLightOn] = useState(1);
  const [light_off, setLightOff] = useState(0);
  const [water, setWater] = useState(0);
  const [autoWatering, setAutoWatering] = useState(false);
 
  useEffect(() =>{
    fetch(ddns + "/getState", {method: "GET"})
    
    .then((response) =>response.json())
    .catch((err)=>{
      console.log("growbox offline")
    })
    .then((json) =>{
      console.log(json);
      setLightOn(parseInt(json.hour_on));
      setLightOff(parseInt(json.hour_off));
      setWater(parseInt(json.water_can))
      setAutoWatering(json.auto_watering)
    })
  }, [])

  const valInc = (func, act_val) =>{
    if(act_val == 23)
      func(1)
    else
      func(act_val+1)
  }
  const valDec = (func, act_val) =>{
    if(act_val == 1)
      func(23)
    else
      func(act_val-1)
  }
  const request = (req, req_body) =>{
    Promise.race([
        fetch(req, req_body),
        new Promise((resolve, reject) => 
          setTimeout(resolve, 4000, "error")
                  )
    ]).then((msg)=>msg.text())
    .then((msg2)=>{
      Alert.alert("Response from server",msg2)
    }).catch((err)=>{
      Alert.alert("Connection error", "Growbox unavailable");
    })
 
    
  }
  const switchWatering = () => {
    
    request (ddns + "/setAutoWatering", 
          {method: "POST", 
          body: JSON.stringify({switch: !autoWatering}),
          headers: {
            'Content-Type': 'application/json',
          },
          }
          )
          setAutoWatering(!autoWatering)
  }

  return(
    <View style={styles.fotocontainer}>
      <View style={{width:40, padding:5}}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={{width:50, height:50}}>
          <Icon name="menu-outline" size={30}/>
        </TouchableOpacity>
      </View>
      <View style={{...styles.fotocontainercounter, paddingTop:60}}>
        <View style={styles.counterContainer}>
          <View style={{justifyContent: "center", alignItems: "center", marginBottom: 10}}>
            <Text style={styles.counterDesc}>Light on (hour)</Text>
          </View>
          <Counter num={light_on} color="#527C58" inc={() => {valInc(setLightOn,light_on)}} dec={() => {valDec(setLightOn,light_on)}}></Counter>
        </View>
        <View style={styles.counterContainer}>
          <View style={{justifyContent: "center", alignItems: "center", marginBottom: 10}}>
            <Text style={styles.counterDesc}>Light off (hour)</Text>
          </View>
          <Counter num={light_off} color="#2D4531"inc={() => {valInc(setLightOff,light_off)}} dec={() => {valDec(setLightOff,light_off)}}></Counter>
        </View>
      </View>

        <View style={{marginVertical:30, flexDirection:"row", justifyContent:"space-evenly"}}>
          <View style={{justifyContent: "center", alignItems: "center", marginBottom: 10}}>
            <Text style={{...styles.counterDesc, marginBottom:10}}>Watering can (L)</Text>
            <Counter num={water} color="#2D4531"inc={() => {valInc(setWater,water)}} dec={() => {valDec(setWater,water)}}></Counter>
          </View>
          <View style={{justifyContent: "center", alignItems: "center", marginBottom: 10}}>
            <Text style={{...styles.counterDesc, marginBottom:10}}>Auto-watering</Text>

            <Switch value={autoWatering} onValueChange={switchWatering}/>
            
          </View>
        </View>
      

      <View style={{alignItems: "center",  flex:2}}>
      <TouchableOpacity style={{ width:90, alignItems: "center", 
                                paddingVertical:10, borderRadius:20, borderWidth:1, borderColor: "gray", height:90, alignItems: "center", justifyContent: "center"
                                }}
                                onPress={()=>{ request (ddns + "/reshedule", 
                                {method: "POST", 
                                body: JSON.stringify({hour_on:light_on, hour_off:light_off, water: water}),
                                headers: {
                                  'Content-Type': 'application/json',
                                },
                                }
                                
                                )}}>
        <Icon name="cog-outline" size={50}/>
      </TouchableOpacity>

       
      </View>

      <View style={{flexDirection: "row", flex:3, justifyContent: "space-evenly"}}>
          <TouchableOpacity onPress={()=>{ 
            request (ddns + "/setWet", 
            {method: "GET"})}
          } style={{width: 90, height:90, borderRadius: 20, borderWidth: 1, borderColor:"gray", alignItems: "center", justifyContent:"center"}}>
            <Text style={{textAlign: "center"}}>Set wet level</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{ 
            request (ddns + "/setHum", 
            {method: "GET"})}
          }

            style={{width: 90, height:90, borderRadius: 20, borderWidth: 1, borderColor:"gray", alignItems: "center", justifyContent:"center"}}>
            <Text style={{textAlign: "center"}}>Set dry level (watering)</Text>
          </TouchableOpacity>
        </View>
    </View>
  )
}

const App = () => {

  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContentOptions={{
       
          activeTintColor: "white",
          inactiveTintColor: "gray",
          activeBackgroundColor: "gray", 
          labelStyle:{
            color:"black",
          
        }
      }}
      initialRouteName="Growbox">
        <Drawer.Screen name="Growbox" component={Home}/>
        <Drawer.Screen name="Settings" component={Settings}/>
      </Drawer.Navigator>
    </NavigationContainer>
  )
};

const styles = StyleSheet.create({
  stateContainer: {
    flexDirection:'row',
    flex:1, 
  },
  
  container: {
    flex:1

  },
  


  counterDesc: {
    fontSize: 16,
  },
  counterContainer:{
    // borderWidth:1
  },
  fotocontainercounter:{
    paddingTop: 50,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    // borderWidth:1,
  },
  fotocontainer:{
    // alignItems: 'center',
   flex:1,
   justifyContent: 'center',
    
  },
  counterButton:{
    borderWidth:1,
    flex:1,
    alignItems: 'center',
    borderColor: 'gray'

  },
  num_holder:{
    alignItems: 'center',
    justifyContent: 'center',
    flex:1,
    
  },
  num_text: {
    fontSize:20,
    color: "white"
  },
  counter:{
    //borderWidth:1,
    flexDirection: "row",
    width: 150,
    justifyContent: 'space-evenly',
  },
  
  
  
});

export default App;