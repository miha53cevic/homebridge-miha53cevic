# A simple plugin made for learning homebridge

## Install

```bash
    npm install -g homebridge-miha53cevic
```

## Config
Add this to your homebridge config (the name can be changed but the accessory name must be SimpleSwitch)
```json

    "accessories": [
        {
            "accessory": "SimpleSwitch",
            "name": "Light",
            "url": "http://192.168.1.2"
        }
    ],

```

## API
Currently none