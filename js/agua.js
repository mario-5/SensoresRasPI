const Gpio = require('onoff').Gpio;
//const led = new Gpio(17, 'out');
const agua = new Gpio(21, 'in', 'both',{debunceTimeout:50});
actual = agua.readSync();
console.log("lectura actual "+actual);
agua.watch((err, value) => {
  if (err) {
    throw err;
  }

  // led.writeSync(value);
  
  console.log ("Valor 1 sin 0 con agua "+value);
});

process.on('SIGINT', _ => {
  //led.unexport();
 agua.unexport();
});
