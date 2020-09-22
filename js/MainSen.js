const { Worker } = require("worker_threads");
var pausa  = require("sleep");
var count = 0;
var d = new Date();
var hora = d.getTime;

console.log("Start Program");
console.log(hora);

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

for (let i = 0; i < 10; i++) {
  pausa.sleep(120);
  run().catch(error => console.log(error));
}

setTimeout(() => console.log("End Program"), 2000);
