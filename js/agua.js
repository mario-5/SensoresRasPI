//control of ground humidity sensors. Start irrigation system when is required
//get required modules
const Gpio = require('onoff').Gpio;
var sensor = require("node-dht-sensor");
var request = require('request');
var ws=require('./wsconect.js'); //API connection functions
var utiles=require('./utiles.js'); //general use utilities
//setup date and time
var d = new Date();
var mes = d.getMonth()+1; // correccion del mes que cuenta de 0 a 11
var dia = d.getDate()+"/"+ mes +"/"+d.getFullYear();
var hora = d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
var mensaje =" ";
//const led = new Gpio(17, 'out');
//Setup humidity sensor
const agua = new Gpio(21, 'in', 'both',{debunceTimeout:50});
const relay = new Gpio(26, 'out', 'both',{debunceTimeout:10});
//get actual status
actual = agua.readSync();
actualRelay = relay.readSync();

if (actual) {
            mensaje ="El sensor Humedad el "+dia+"a la hora "+hora+"en  H indica falta de riego";
            ws.POSTTelegram (mensaje);
            if (actualRelay) {
                           relay.writeSync(0);
                           mensaje ="Activo el riego el "+dia+"a la hora "+hora;
                           ws.POSTTelegram (mensaje);
                           console.log (mensaje);
                            }
               else {
                 relay.writeSync(1);
                 mensaje = dia+" "+hora+" Activo el riego";
                 ws.POSTTelegram(mensaje);
                 console.log (mensaje);
                   }
            }
      else {
           mensaje ="El sensor Humedad el "+dia+"a la hora "+hora+"en  H indica riego suficiente";
           ws.POSTTelegram (mensaje);
           }

//agua.watch((err, value) => {
 // if (err) {
   // throw err;
 // } 
//});

process.on('SIGINT', _ => {
 relay.unexport();
 agua.unexport();
});
