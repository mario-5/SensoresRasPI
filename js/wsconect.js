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



