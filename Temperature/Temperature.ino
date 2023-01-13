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
      // Read humidity %
      float h = dht.readHumidity();
      // Read temperature as Celsius (the default)
      float t = dht.readTemperature();
      tMemory=t;
      hMemory=h;
      // Check if any reads failed and exit early (to try again).
      if (isnan(h) || isnan(t)) {
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
      state_s1 = 1;
      break;            
  }
}

void setup()
{    
    //capteur de temperature et humidité
    Serial.begin(115200);
    Serial.println(F("DHTxx test!"));
    dht.begin();
}

void loop()
{
  SM_s1();
}