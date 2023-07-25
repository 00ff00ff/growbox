float flow ; //Liters of passing water volume
unsigned long pulse_freq;
bool count = false;
int incoming = 0;
int l = 14;
int m = 15;
int r = 16;
int g = 17;
char output[256];
int minADC = 26;
int maxADC = 632;
void setup()
{
  pinMode(2, INPUT);
  Serial.begin(9600);
  attachInterrupt(0, pulse, RISING); // Setup Interrupt
  pinMode(l, INPUT);
  pinMode(m, INPUT);
  pinMode(r, INPUT);
  pinMode(g, INPUT);
  
}

void loop ()
{

 if(Serial.available() > 0){
    incoming =Serial.read() - '0';
     Serial.print(incoming);
      Serial.flush();
      Serial.println(incoming);
      switch(incoming){
        case 0:
          count = false;
          break;
        case 1:
          pulse_freq = 0;
          count = true;
          break;
        case 2:
          flow = .00225 * pulse_freq;
          char str_temp[6];
          dtostrf(flow, 4, 2, str_temp);
          sprintf(output, "{\"water\": %s}\n",str_temp);
          Serial.print(output);
          
         break;
         case 3:
          int v = analogRead(g);
          v = map(v, minADC, maxADC,0, 100);
          sprintf(output, "{\"left\": %d, \"middle\": %d, \"right\": %d}\n", 0, v, 0);
          Serial.print(output);
          //Serial.flush();
          break;
        
      }
  
 }
  
}
//void serialEvent() {
////  while (Serial.available()) {
////    // get the new byte:
////    char inChar = (char)Serial.read();
////    // add it to the inputString:
////    inputString += inChar;
////    // if the incoming character is a newline, set a flag so the main loop can
////    // do something about it:
////    if (inChar == '\n') {
////      stringComplete = true;
////    }
////  }
//if(Serial.available() > 0){
//      incoming =Serial.read() - '0';
////      Serial.print(incoming);
//      Serial.flush();
////      Serial.println(incoming);
//      switch(incoming){
//        case 0:
//          count = false;
//          break;
//        case 1:
//          pulse_freq = 0;
//          count = true;
//          break;
//        case 2:
//          flow = .00225 * pulse_freq;
//          char str_temp[6];
//          dtostrf(flow, 4, 2, str_temp);
//          sprintf(output, "{\"water\": %s}\n",str_temp);
//          Serial.print(output);
//          
//          break;
//        case 3:
//          sprintf(output, "{\"left\": %d, \"middle\": %d, \"right\": %d}\n", analogRead(l), analogRead(m), analogRead(r));
//          Serial.print(output);
////          Serial.flush();
//          break;
//        
//      }
//  }
//}


void pulse () // Interrupt function

{
  if(count)
    pulse_freq++;
}
