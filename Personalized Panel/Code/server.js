
var express = require('express');
var bodyParser = require("body-parser");
var app = express();

app.use(express.static("."));

//makes parsing of POST easier
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//import weather module
var WeatherController = require('./weather');
var wc = new WeatherController();

//import calculator module
var CalculatorController = require('./calculator');
var cc = new CalculatorController();

//server is listening to port 8080
app.listen(8080, function(){
	console.log('Server Running...');
});

//send html of calculation page to client
app.get('/calculation', function(req, res){
	var html = cc.render();
	console.log('Render calculation page');
	res.send(html);
})

//process a factorial request
app.get('/factorial', function(req, res){
  var seed = req.query.seed;
  console.log("Factorial request, seed is " + seed);

//Test cases for if the seed input is blank or negative
  if (seed == "")
  {
  res.send("The seed is blank. Please specify input");
  }
  else if (seed<0)
  {
  res.send("The seed is negative. Please specify a positive number");
  }
//If seed is not blank or non-negative, then the factorial for the seed is computed 
  else if (seed) 
  {
    var factorial = cc.computeFactorial(seed);
    console.log("Sending factorial result: " + factorial + "\n");
    res.send("The factorial of " + seed + " is " + factorial.toString());
  }
})

//process a summation request
app.get('/sum', function(req, res){
  var seed = req.query.seed; 

  //Test cases
  if (seed == "")
  {
    res.send("The seed is blank. Please specify input");
  }
  else if (seed<0)
  {
    res.send("The seed is negative. Please specify a positive number");
  }
  //If seed is a valid input, compute summation of seed 
  else if(seed)
  {
    var sum = cc.computeSum(seed);
    console.log("Sending result of sum: " + sum + "\n");
    res.send("The summation of " + seed + " is " + sum.toString());
  }
})

//send html to display weather page on client 
app.get('/weather', function(req, res){
	var html = wc.render();
	console.log("Render weather page");
	res.send(html);
})

//listens to emitter and sends weather forecast data as html to the client
app.post('/getWeather', function(req, res){
		wc.once('byebye', function(msg){
			res.send(msg);
		});
		wc.getWeather(req);
	});

