var exports=module.exports={};

exports.POSTcriaserver=function(SensorCode,Day,Time,Place,Value,Type){

var options = {
  'method': 'POST',
  'url': 'http://criaserver:9000',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({"SensorCode":SensorCode,"Day":Day,"Time":Time,
  "Place":Place,"Value":Value,"Type":Type})

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
}); 
};

exports.log=function(text){

var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
var log_stdout = process.stdout;

  log_file.write(util.format(text) + '\n');
  log_stdout.write(util.format(text) + '\n');
};

