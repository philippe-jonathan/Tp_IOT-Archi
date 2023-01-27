#include "BluetoothSerial.h"
#include <WiFi.h>
#include <PubSubClient.h>
#include <ESP32Ping.h>


#if !defined(CONFIG_BT_ENABLED) || !defined(CONFIG_BLUEDROID_ENABLED)
#error Bluetooth is not enabled! Please run `make menuconfig` to and enable it
#endif

BluetoothSerial* SerialBT=NULL;
int state_wifi =-1;
const int buttonPin = 16;

byte mac[]    = {  0xDE, 0xED, 0xBA, 0xFE, 0xFE, 0xED };
const char * ssid;
const char * password;
bool passwordInput=false;

WiFiClient wifiClient;
PubSubClient client(wifiClient);





void SM_s1_bluetooth() {
  if(digitalRead(buttonPin)==LOW && state_wifi==-1){
    SerialBT->begin(F("aaaaaaaa")); //Bluetooth device name
    Serial.println(F("The device started, now you can pair it with bluetooth!"));
    state_wifi =0;
  }
  
  switch (state_wifi) {
    case 0:
      if(SerialBT->available()){
        SerialBT->println(F("resseignez le nom de votre wifi"));
        state_wifi = 1;
      }
      break;
    case 1:
      {
        String inputSsid=SerialBT->readString();
        if(inputSsid!=""){
          Serial.println(inputSsid);
          inputSsid.remove(inputSsid.length()-2, 2);    
          ssid= inputSsid.c_str();
          SerialBT->println(F("resseignez le mot de passe wifi de votre wifi"));
          while(!passwordInput){
            String inputPassword=SerialBT->readString();
            if(inputPassword!=""){
              passwordInput=true;
              inputPassword.remove(inputPassword.length()-2, 2);
              password=inputPassword.c_str();
              Serial.print(F("Connecting to"));
              Serial.print(ssid);
              Serial.print(password);              
              WiFi.begin(ssid, password);
              while (WiFi.status() != WL_CONNECTED) {
                delay(500);
                Serial.print(".");
              }
              Serial.println(F("WiFi connected, IP address: "));
              Serial.println(WiFi.localIP());
              IPAddress server(192,168,150,72);
              if(Ping.ping(server)){
                Serial.println(F("Ping successful!!"));
              }
              client.setServer(server, 1883);
            }            
          }
          Serial.println(ssid);  
          state_wifi=4;
        }
        break;
      }      
    case 2:
        Serial.println(ssid);       
        
        Serial.println(ssid);
        state_wifi=3;
      break;
    case 3 :
      {       
        String input=SerialBT->readString();
        if(input!=""){
          password = input.c_str();
          // We start by connecting to a WiFi network
          Serial.print(F("Connecting to "));
          Serial.println(ssid);
          Serial.println(password);
          WiFi.begin(ssid, password);
          while (WiFi.status() != WL_CONNECTED) {
            delay(500);
            Serial.print(".");
          }
          Serial.println(F("WiFi connected, IP address: "));
          Serial.println(WiFi.localIP());
          IPAddress server(192,168,150,72);
          if(Ping.ping(server)){
            Serial.println(F("Ping successful!!"));
          }
          client.setServer(server, 1883);
          state_wifi=4;
        }
        break;
      }         
    case 4 :
      if (!client.connected()) {
        
          Serial.print(F("Attempting MQTT connection..."));
          // Attempt to connect
          if (client.connect("ESP32Client")) {
            Serial.println(F("connected"));
            // Once connected, publish an announcement...
            client.publish("ESP32","Connected");
            // ... and resubscribe
            client.subscribe("inTopic");
          } else {
            Serial.print(F("failed, rc="));
            Serial.print(client.state());
            state_wifi = 4;
          
            // Wait 5 seconds before retrying
          
        }
      }
      else{
        if(digitalRead(buttonPin)==LOW)
        client.publish("ESP32","boutton appuyé");
      }
      break;
    default:
      break;      
  }
  //Serial.println(String(state_wifi));
  if (Serial.available()) {
  SerialBT->print(Serial.readString());
  }
  if (SerialBT->available()) {
    String input=SerialBT->readString();
    Serial.print(input);
    Serial.print(input.length());
  }
}

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print(F("Message arrived ["));
  Serial.print(topic);
  Serial.print(F("] "));
  for (int i=0;i<length;i++) {
    Serial.print((char)payload[i]);
  }
}

void setup()
{    
    SerialBT = new BluetoothSerial;
    Serial.begin(115200);
    //client.setCallback(callback);
    pinMode(buttonPin, INPUT_PULLUP);
}

void loop()
{
  SM_s1_bluetooth();
}