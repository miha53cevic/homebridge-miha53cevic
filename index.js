/*
    BIbiloteka za jednostavnije korištenje GET i POST
    inače se koristi http modul nodejs-a
    
    Ako budeš tražil o njemu budeš saznal da je zastarjeli ali to ne
    znači da je loš nego mu više ne dodavaju nove stvari, ali i dalje
    popravljaju bug-ove
*/
const request = require('request');

/*
    Koriste se kao globalne varijable
*/
let Service, Characteristic;

module.exports = function (homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    /*
        Prvi parametar:  nebitan
        Drugi parametar: MORA biti accessory name u config-u!
        Treci parametar: klasa koja mora imati constructor, getServices, setSwitchOnCharacteristic, getSwitchOnCharacteristic
    */
    homebridge.registerAccessory('miha53cevic-plugin', 'SimpleSwitch', SimpleSwitch);
};

class SimpleSwitch {
    /*
        Constructor nase klase

        Dobiva od homebridge-a log i config parametre gdje je
        log: sluzi za debuganje
        config: je json config koji se nalazi na homebridge-u, koristis ga kao config['neka varijabla']
    */
    constructor(log, config) {
        this.log = log;
        this.config = config;
        this.url = config['url'];

        this.switchService = new Service.Switch(config['name']);
        this.isOn = false; // default value so we don't get undefined
    }

    /*
        Ova funkcija se zove na pocetku, i ovdje se trebaju staviti svi servisi koje se koriste
        P.S. uvijek je za novi accessory potreban service - informationService i on je readonly
        ok su ostali servici se mogu i citati i mjenjati pa su potrebne callback funkcije
    */
    getServices() {
        let informationService = new Service.AccessoryInformation();
        informationService
            .setCharacteristic(Characteristic.Manufacturer, "test manufacturer")
            .setCharacteristic(Characteristic.Model, "test model")
            .setCharacteristic(Characteristic.SerialNumber, "123-456-789");

        /*
            Potrebno je postaviti getter i setter funkcije koje se zovu kada se zeli
            ili promjeniti stanje switcha ili saznati koje je.
            U ovom slucaju su nazivi: 
                getSwitchOnCharacteristic
                setSwitchOnCharacteristic
        */
        this.switchService
            .getCharacteristic(Characteristic.On)
            .on('get', this.getSwitchOnCharacteristic.bind(this))
            .on('set', this.setSwitchOnCharacteristic.bind(this));

        // Na kraju vrati sve servise kao array
        return [informationService, this.switchService];
    }

    /*
        Setter funkcija koju smo postavili u getServices na switchservice, ona
        služi kada kliknemo na gumb ili recemo komandu da se pošalji boolean u
        ovom slučaju koji je true ili false
        Callback funkcija je funkcija kojom se javlja ako je došlo do ikakve
        greške, ako nije stavi null kao prvi parametar
    */
    setSwitchOnCharacteristic(value, callback) {
        // Spremi vrijednost koju smo dobili : boolean
        this.isOn = value;

        this.log(`calling setSwitchOnCharacteristic`, value);

        /*
            Post request šalje dodatno na neki server json varijablu light koja je boolean
            - ako se koristi express da se prima ta varijabla mora se staviti post a ne get
            jer se onda ocekuju post requesti

            Prvo se da url servera koji je stavljen u CONFIG zatim je sljedece metoda kojom se
            šalje u ovom slucaju POST.
            Nakon toga je kaj se šalje, u ovom slučaju je json dokument kojeg možemo stvoriti preko
            constructora samo sa {}
            
            Nakon toga drugi parametar request funkcije je callback funkcije koja se ove kad se posalje.
            Ili se vraca error i ispisuje u homebridge konzolu ili ako server nije poslal 200 (ok) onda
            isto to stavi u konzolu
        */
        request({
            url: this.url,
            method: 'POST',
            json: {
                "light": `${this.isOn}`
            }
        }, (error, response) => {

            if (response !== undefined) {
                if (response.statusCode != 200) {
                    this.log(`Error: response from server: `, response);
                }
            }

            if (error) {
                this.log(`An error has occured: `, error);
            }
        });

        // ako nema grešaka pošalji null
        callback(null);
    }

    /*
        Getter koji se zove kada nismo duže vrijeme bili na aplikaciji
        da se zna u kojem smo stanju mora samo vracati svoje trenutno
        spremljeno stanje
        Callback se koristi samo sto je jos sad drugi parametar vrijednost
        koju vracamo
    */
    getSwitchOnCharacteristic(callback) {

        this.log(`calling getSwitchOnCharacteristic`, this.isOn);

        // vrati spremljenu vrijednost
        callback(null, this.isOn);
    }

};