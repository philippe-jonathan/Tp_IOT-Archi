/*
 *  This sketch sends data via HTTP GET requests to data.sparkfun.com service.
 *
 *  You need to get streamId and privateKey at data.sparkfun.com and paste them
 *  below. Or just customize this script to talk to other HTTP servers.
 *
 */
//capteur de temperature et humidité
#include "DHT.h"

#define DHTPIN 14
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);






int state_s1 = 0;
float hMemory;
float tMemory;

void SM_s1() {
  //Almost every state needs these lines, so I'll put it outside the State Machine
  float h = dht.readHumidity();
  // Read temperature as Celsius (the default)
  float t = dht.readTemperature();
  
  int state_prev_s1 = state_s1;

  //State Machine Section
  switch (state_s1) {
    case 0: //RESET!
      //Catch all "home base" for the State MAchine
      state_s1 = 1;
    break;

    case 1: //WAIT
      //Wait for the temperature or humidity to change
      if (tMemory != t || hMemory != h) {state_s1 = 2;}
    break;
    case 2: //Mesure Temperature & humidity
      float h = dht.readHumidity();
      // Read temperature as Celsius (the default)
      float t = dht.readTemperature();
      // Read temperature as Fahrenheit (isFahrenheit = true)
      float f = dht.readTemperature(true);
      tMemory=t;
      hMemory=h;
      // Check if any reads failed and exit early (to try again).
      if (isnan(h) || isnan(t) || isnan(f)) {
        Serial.println(F("Failed to read from DHT sensor!"));  
        return;
      }
      float hif = dht.computeHeatIndex(f, h);
      // Compute heat index in Celsius (isFahreheit = false)
      float hic = dht.computeHeatIndex(t, h, false);
      Serial.print(F("Humidity: "));
      Serial.print(h);
      Serial.print(F("%  Temperature: "));
      Serial.print(t);
      Serial.print(F("C "));
      Serial.print(f);
      Serial.print(F("F  Heat index: "));
      Serial.print(hic);
      Serial.print(F("C "));
      Serial.print(hif);
      Serial.println(F("F"));
      
      break;            
    }
  }


void setup()
{    
    //capteur de temperature et humidité
    Serial.begin(115200);
    Serial.println(F("DHTxx test!"));
    dht.begin();
    Serial.begin(115200);
}


void loop()
{
  // Wait a few seconds between measurements.
  SM_s1();
  //delay(2000);

  // Reading temperature or humidity takes about 250 milliseconds!
  // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
  
  
  
}

