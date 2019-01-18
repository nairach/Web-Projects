`use strict` 

var fs = require('fs');
var http = require('http');
var utils = require('util')
var request = require('request');
var EventEmitter = require('events').EventEmitter;

//get the API key from file in parent directory 
var key = fs.readFileSync('../wundergroundkey.txt','utf8');

function Weather(){
	EventEmitter.call(this);
}

utils.inherits(Weather, EventEmitter);

//returns html string for displaying button to request weather
Weather.prototype.render = function(){
	var str = `
	<html>
		<body>
			<div style = "text-align:center; margin:0px auto; display:block;">
				<h1> Get Weather! </h1>
    			<input type = "text" id = "zipcode" placeholder="zipcode" />
    			<button type = "button" onClick ="requestWeather()">Get Weather!</button>
    			<button type = "button" onClick = "displayWeather();">Refresh!</button>
    			<div id = "myDiv"></div>
    		</div>
  		</body>
	</html>`

	return str;
}

//Gets and displays weather data (date, description, temperature) in the form of a table from the URL constructed 
Weather.prototype.getWeather = function(req){
	var URL = "https://api.openweathermap.org/data/2.5/forecast?zip=" + req.body.city + "&appid=" + key + "&units=imperial";
  var self = this;
  console.log("Requesting hourly forecast");
  //sends request to URL 
	request(URL, function(error, response, body){
		  var json = JSON.parse(body);
			var length = json.list.length;
			var htmlOutput='<table><tr><th>Date and Time</th><th>Weather Description</th><th>Temp (deg. F)</th></tr>';
 
      		for(i = 0; i<length; i++) {      
      			var date = json.list[i].dt_txt;
      			var description = json.list[i].weather[0].description;
      			var temp = json.list[i].main.temp;
      			htmlOutput+="<tbody><tr><td>" + date + "</td>";
      			htmlOutput+="<td>"+ description + "</td>";
      			htmlOutput+="<td>" + parseInt(temp) + "</td></tr>";      
      		}
      		htmlOutput+="</tbody>";
      		htmlOutput+="</table>";
      		console.log("Table is appearing on website");
      		self.emit('byebye',htmlOutput);
	});
}

module.exports = Weather;

