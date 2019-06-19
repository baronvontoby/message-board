var express = require("express");
// var logger = require("morgan");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");

let PORT = process.env.PORT || 8080;


// Initialize Express
var app = express();

require('./routes/routes')(app);
// Make public a static folder
app.use(express.static("public"));
// Configure middleware

// Use morgan logger for logging requests
// app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/disneyArticles";


//connecting to the database
mongoose.connect(MONGODB_URI,{useNewUrlParser:true});

app.listen(PORT, function(){
    console.log('Server now listening on ' + PORT);
});