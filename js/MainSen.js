// get necesaries modules
const { Worker } = require("worker_threads");
var pausa  = require("sleep");
var utiles = require('./utiles.js');
// setup date and time
var count = 0;
//Setup global variables
global.k1T ="0";
global.k1H ="0";

//initial console message
console.log("Start Program");
let tempHora =utiles.stringDate().SHour
console.log(tempHora);


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
for (let i = 0; i < 50; i++) {
  run().catch(error => console.log(error));
<<<<<<< HEAD
  pausa.sleep(120);
=======
  pausa.sleep(60);
>>>>>>> daca39ce1c8db18c74be0f07f4876fe3a79c7afa
}

// End message
console.log("End Program");
utiles.logfs("End Program "+utiles.stringDate().SHour);
//setTimeout(() => console.log("End Program"), 2000);
