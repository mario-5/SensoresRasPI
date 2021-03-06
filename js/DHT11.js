//get requires modules
const { workerData, parentPort } = require("worker_threads");
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


// You can do any heavy stuff here, in a synchronous way
// without blocking the "main thread"
const sleep = () => {
  return new Promise(resolve => setTimeout(() => resolve, 500));
};
sensor.read(11, 23, function(err, temperature, humidity) {
  if (!err) {
    console.log(`temp: ${temperature}°C, humidity: ${humidity}%`);
    var temp=temperature;
    var humi=humidity;
    utiles.logfs (temp+" "+humi+" "+hora);
  }
  ws.POSTcriaserver ("K1",dia,hora,"H",temp,"T");
  ws.POSTcriaserver ("K1",dia,hora,"H",humi,"H");
  utiles.logfs (temp+" "+humi+" "+hora);
  //agrego mensaje via Telegram bot
  mensaje ="El sensor DHT-11 el "+dia+"a la hora "+hora+"en  H la temperatura "+temp);
 
  ws.POSTTelegram (mensaje);
 
});


parentPort.postMessage({ data: hora });
