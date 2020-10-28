// General utilities functions
var exports=module.exports={};

//Debug function
exports.logfs=function(text){

//require modules
var fs = require('fs');
var util = require('util');
//setup date and time
var d = new Date();
var mes = d.getMonth()+1; // correccion del mes que cuenta de 0 a 11
var dia = d.getDate()+"/"+ mes +"/"+d.getFullYear();
var hora = d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();

var log_file = fs.createWriteStream('/home/pi/iot/debug.log', {flags : 'a'});
var log_stdout = process.stdout;

  log_file.write(dia+" "+hora+" "+util.format(text) + '\n');
  log_stdout.write(dia+" "+hora+" "+util.format(text) +'\n');
};

// Day and time function
exports.stringDate=function(){

//setup date and time
var d = new Date();
var mes = d.getMonth()+1; // correccion del mes que cuenta de 0 a 11
var dia = d.getDate()+"/"+ mes +"/"+d.getFullYear();
var hora = d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
console.log(dia);

	return{
		SDay:dia,
		SHour:hora,
		};
};
