/*
    Based on Neil Kolban example for IDF: https://github.com/nkolban/esp32-snippets/blob/master/cpp_utils/tests/BLE%20Tests/SampleServer.cpp
    Ported to Arduino ESP32 by Evandro Copercini
    updates by chegewara
*/

#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include <ESP32Ping.h>

// See the following for generating UUIDs:
// https://www.uuidgenerator.net/

#define SERVICE_UUID        "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
#define CHARACTERISTIC_UUID "beb5483e-36e1-4688-b7f5-ea07361b26a8"
BLECharacteristic *pCharacteristic;
BLEServer *pServer;
BLEService *pService;
BLEAdvertising *pAdvertising;
int state_wifi =-1;
//const int buttonPin = 16;

byte mac[]    = {  0xDE, 0xED, 0xBA, 0xFE, 0xFE, 0xED };
const char * ssid;
const char * password;

WiFiClient wifiClient;
PubSubClient client(wifiClient);

void setup() {
  Serial.begin(115200);
  //pinMode(buttonPin, INPUT_PULLUP);  
}

void SM_s1_bluetooth() {
  if(state_wifi==-1){
    Serial.println("Starting BLE work!");
    BLEDevice::init("AirluxOG");
    pServer = BLEDevice::createServer();
    pService = pServer->createService(SERVICE_UUID);
    pCharacteristic = pService->createCharacteristic(
                                          CHARACTERISTIC_UUID,
                                          BLECharacteristic::PROPERTY_READ |
                                          BLECharacteristic::PROPERTY_WRITE
                                         );

    pCharacteristic->setValue("Renseignez vos identifiants wifi");
    pService->start();
    // BLEAdvertising *pAdvertising = pServer->getAdvertising();  // this still is working for backward compatibility
    pAdvertising = BLEDevice::getAdvertising();
    pAdvertising->addServiceUUID(SERVICE_UUID);
    pAdvertising->setScanResponse(true);
    pAdvertising->setMinPreferred(0x06);  // functions that help with iPhone connections issue
    pAdvertising->setMinPreferred(0x12);
    BLEDevice::startAdvertising();
    Serial.println("Characteristic defined! Now you can read it in your phone!");
    Serial.println(F("The device started, now you can pair it with bluetooth!"));
    state_wifi =0;
  }  
    switch (state_wifi){
      case 0:
        if(pCharacteristic->getValue()!="Renseignez vos identifiants wifi"){
          String ssid1=String(pCharacteristic->getValue().c_str())/*.remove(sizeof(pCharacteristic->getValue())-2, 2).c_str()*/;
          Serial.println(ssid1);
          
          Serial.println(sizeof(ssid1));
          state_wifi=1;
        }
        break;
      case 1:
        break; 
    }
  
}

void loop() {
    
  SM_s1_bluetooth();
  // put your main code here, to run repeatedly:
}