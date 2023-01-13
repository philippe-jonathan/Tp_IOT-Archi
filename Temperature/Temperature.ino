#include "DHT.h"
#include "BluetoothSerial.h"

#define DHTPIN 14
#define DHTTYPE DHT11
#if !defined(CONFIG_BT_ENABLED) || !defined(CONFIG_BLUEDROID_ENABLED)
#error Bluetooth is not enabled! Please run `make menuconfig` to and enable it
#endif

BluetoothSerial SerialBT;
DHT dht(DHTPIN, DHTTYPE);
int state_s1 = 0;
float hMemory;
float tMemory;
const int buttonPin = 16;
int buttonState = HIGH;
int prev_state = buttonState;
int current_state = buttonState;

void SM_s1_bluetooth() {
    // put your main code here, to run repeatedly:
  buttonState = digitalRead(buttonPin);
  current_state = buttonState;
  
  switch (current_state) {
    case HIGH:
      if (prev_state == LOW){
        prev_state = HIGH;
        SerialBT.end(); //On desactive le bluetooth
        Serial.println("The device end, now you can't pair it with bluetooth!");
      }
      break;
    case LOW:
      if (prev_state == HIGH){
        prev_state = LOW;
        SerialBT.begin("OnEstLa"); //Bluetooth device name
        Serial.println("The device started, now you can pair it with bluetooth!");
      }
      break;
    default:
      break;
  }
  if (Serial.available()) {
    SerialBT.println(Serial.readString());
  }
  if (SerialBT.available()) {
    Serial.write(SerialBT.read());
  }
}

void SM_s1_temperature() {
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
      // Compute heat index in Celsius (isFahreheit = false)
      float hic = dht.computeHeatIndex(t, h, false);
      Serial.print(F("Humidity: "));
      Serial.print(h);
      Serial.print(F("%  Temperature: "));
      Serial.print(t);
      Serial.print(F("C "));
      Serial.print(F(" Heat index: "));
      Serial.print(hic);
      Serial.println(F("C "));
      state_s1 = 1;
      break;            
  }
}

void setup()
{    
    Serial.begin(115200);
    pinMode(buttonPin, INPUT_PULLUP);
    Serial.println(F("DHTxx test!"));
    dht.begin();
}

void loop()
{
  SM_s1_bluetooth();
  SM_s1_temperature();
}