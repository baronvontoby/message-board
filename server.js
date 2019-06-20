var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
const routes = require("./routes/routes.js");

// let PORT = process.env.PORT || 8080;

// Initialize Express
var app = express();

// Make public a static folder
app.use(express.static("public"));
// Configure middleware

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use("/", routes);

let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/disneyArticles";


//connecting to the database
mongoose.connect(MONGODB_URI,{useNewUrlParser:true});

app.listen(process.env.PORT||8080, function(){
    console.log('Server now listening on ');
});