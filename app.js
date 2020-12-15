const express = require("express");

// native package allowing user to access server data
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

// CAN ONLY HAVE 1 res.send() METHOD IN EACH app.get() METHOD

// this loads up the html when user is on root route
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

// allows server to access the data input by user
app.post("/", function(req, res){

  const query = req.body.cityName;
  const apiKey = ;
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey + "&units=" + unit +"&q=" + query;

  // method to access data at specific URL
  https.get(url, function(response) {
    console.log(response.statusCode);

  // method to allow user to see data
  response.on("data", function(data) {
    // console.log(data); <-- logs data in a hexidecimal format
    // the JSON.parse method below turns the data into JSON format :
    const weatherData = JSON.parse(data);
    // JSON.stringify() does the opposite, and takes an object and turns it to a single string
    const temp = weatherData.main.temp;
    const description = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
    // the below sends the data to the user site
    res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celsius</h1>");
    res.write("<p>The weather description is " + description + "</p>");
    res.write("<img src=" + iconURL + ">");
    res.send();
    })
  })
});

//


// tunes app onto server
app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
