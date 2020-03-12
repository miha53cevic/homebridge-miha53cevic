# A simple plugin made for learning homebridge

## Install

```bash
    npm install -g homebridge-miha53cevic
```

## Config
Add this to your homebridge config (the name can be changed but the accessory name must be SimpleSwitch)  
If using multiple lights you can give each an id (should be a number)
```json

    "accessories": [
        {
            "accessory": "SimpleSwitch",
            "name": "Light",
            "id": "1",
            "url": "http://192.168.1.2"
        }
    ],

```

## API
The url paramater sends a POST request with json that contains an object "state":"boolean"  
The id paramater is sent with the POST request json 

## Homebridge services
- Service "Accessory Information"
- Service "Air Purifier"
- Service "Air Quality Sensor"
- Service "Battery Service"
- Service "Camera RTP Stream Management"
- Service "Carbon Dioxide Sensor"
- Service "Carbon Monoxide Sensor"
- Service "Contact Sensor"
- Service "Door"
- Service "Doorbell"
- Service "Fan"
- Service "Fan v2"
- Service "Filter Maintenance"
- Service "Faucet"
- Service "Garage Door Opener"
- Service "Heater Cooler"
- Service "Humidifier Dehumidifier"
- Service "Humidity Sensor"
- Service "Irrigation System"
- Service "Leak Sensor"
- Service "Light Sensor"
- Service "Lightbulb"
- Service "Lock Management"
- Service "Lock Mechanism"
- Service "Microphone"
- Service "Motion Sensor"
- Service "Occupancy Sensor"
- Service "Outlet"
- Service "Security System"
- Service "Service Label"
- Service "Slat"
- Service "Smoke Sensor"
- Service "Speaker"
- Service "Stateless Programmable Switch"
- Service "Switch"
- Service "Temperature Sensor"
- Service "Thermostat"
- Service "Valve"
- Service "Window"
- Service "Window Covering"
- Service "Camera Operating Mode"
- Service "Camera Event Recording Management"
- Service "Wi-Fi Router"
- Service "Wi-Fi Satellite"

To find out more about these services go here: https://github.com/KhaosT/HAP-NodeJS/blob/master/src/lib/gen/HomeKit.ts  
  
CTRL + F the service you want more info about