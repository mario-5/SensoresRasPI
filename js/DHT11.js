const { workerData, parentPort } = require("worker_threads");
var sensor = require("node-dht-sensor");
var request = require('request');
var d = new Date();
var hora = d.getHours();
var minu = d.getMinutes();
var segu = d.getSeconds();
var mill = d.getMilliseconds();

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
  }
 var options = {
  'method': 'POST',
  'url': 'http://criaserver:9000',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({"temperatura":temp,"humedad":humi})

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
}); 
});
let temp=hora +':'+minu+':'+segu+':'+mill;
parentPort.postMessage({ data: temp });
