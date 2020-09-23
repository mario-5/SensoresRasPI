// get necesaries modules
const { Worker } = require("worker_threads");
var pausa  = require("sleep");
// setup date and time
var count = 0;
var d = new Date();
var hora = d.getHours();
var minu = d.getMinutes();
var segu = d.getSeconds();
var mill = d.getMilliseconds();

//initial console message
console.log("Start Program");
let temp=hora +':'+minu+':'+segu+':'+mill;
console.log(temp);

// setup of DHT11 Temperature and Humidity sensor
const runService = () => {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./DHT11.js", {});
    worker.on("message", resolve);
    worker.on("error", reject);
    worker.on("exit", code => {
      if (code != 0) {
        reject(new Error("Worker has stopped"));
      }
    });
  });
};

const run = async () => {
  const result = await runService();
  console.log(count++);
  console.log(result);
};

// start DHT11 threads
for (let i = 0; i < 10; i++) {
  run().catch(error => console.log(error));
  pausa.sleep(20);
}

// End message
let temp=hora +':'+minu+':'+segu+':'+mill;
console.log(temp);
console.log("End Program");
//setTimeout(() => console.log("End Program"), 2000);
