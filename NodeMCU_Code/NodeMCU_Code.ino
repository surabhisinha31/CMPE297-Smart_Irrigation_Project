#include "dht.h"
#define DHT11_PIN D7 // Analog Pin sensor is connected to
dht DHT;

#include <ESP8266WiFi.h>
#include <WebSocketClient.h>
boolean handshakeFailed=0;
String data= "HELLO WORLD";
char path[] = "/";   //identifier of this device
const char* ssid     = "laptop";
const char* password = "999999999";
char* host = "73.158.69.179";  //replace this ip address with the ip address of your Node.Js server
const int espport= 3000;
  
WebSocketClient webSocketClient;
unsigned long previousMillis = 0;
unsigned long currentMillis;
unsigned long interval=300; //interval for sending data to the websocket server in ms
// Use WiFiClient class to create TCP connections
WiFiClient client;

String getTempAndHumidSensorData(){
  int chk = DHT.read11(DHT11_PIN);
  String data_ = String(DHT.temperature) + " , " + String(DHT.humidity);
  return data_;
}

String getSoilSensorData(){
  String data = "";
  int soilSensorVal = analogRead(A0);
  Serial.println(soilSensorVal);
  if( soilSensorVal < 930){
    data = "WET";
    }
  else{
    data = "DRY";
    }
    return data;
}

String getSensorsData(){
  return getSoilSensorData() +" , "+getTempAndHumidSensorData();
}

void setup() {
  Serial.begin(9600);
  pinMode(LED_BUILTIN, OUTPUT);     // Initialize the LED_BUILTIN pin as an output
  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");  
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  delay(1000);
  
wsconnect();
//  wifi_set_sleep_type(LIGHT_SLEEP_T);
  Serial.println(client.connected());
  Serial.println(client.available());
}
void loop() {
  if (client.connected() || client.available()) {
currentMillis=millis(); 
    webSocketClient.getData(data);    
    if (data.length() > 0) {
    //****send log data to server in certain interval*************
 //currentMillis=millis();   
 if (abs(currentMillis - previousMillis) >= interval) {
previousMillis = currentMillis;
//data= (String) analogRead(A0); //read adc values, this will give random value, since no sensor is connected. 
//data = getSensorsData();
Serial.println(data);
delay(1000);
//For this project we are pretending that these random values are sensor values
webSocketClient.sendData(data);//send sensor data to websocket server
}
  }
  else{
}
delay(5);
  }
}
//***************************************
//******function definitions***************************
void wsconnect(){
  // Connect to the websocket server
  if (client.connect(host, espport)) {
    Serial.println("Connected");
  } else {
    Serial.println("Connection failed.");
      delay(1000);  
   
   if(handshakeFailed){
    handshakeFailed=0;
    ESP.restart();
    }
    handshakeFailed=1;
  }
  // Handshake with the server
  webSocketClient.path = path;
  webSocketClient.host = host;
  if (webSocketClient.handshake(client)) {
    Serial.println("Handshake successful");
  } else {
    
    Serial.println("Handshake failed.");
   delay(4000);  
   
   if(handshakeFailed){
    handshakeFailed=0;
    ESP.restart();
    }
    handshakeFailed=1;
  }
}
