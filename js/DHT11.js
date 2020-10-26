//get requires modules
const { workerData, parentPort } = require("worker_threads");
var sensor = require("node-dht-sensor");
var request = require('request');
var ws=require('./wsconect.js'); //API connection functions
var utiles=require('./utiles.js'); //general use utilities
//setup date and time
var d = new Date();
var dia = d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear();
var hora = d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();



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

  ws.POSTTelegram ("K1",dia,hora,"H",temp,"T");
 
});


parentPort.postMessage({ data: hora });
