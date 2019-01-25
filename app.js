// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;

  var data = JSON.stringify({
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  });

  app.post("/failure", function(req, res){

  });

  var options = {
    url: "https://us17.api.mailchimp.com/3.0/lists/ba9ed36ab7",
    method: "POST",
    headers: {
      authorization: "acydh 322e537019542317ad8ef5d4f227b671-us17"
    },
    body: data
  };

  request(options, function(error, response, body) {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      if (response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
    console.log(response.statusCode);
  });
});

app.post("/failure", function(req, res) {
  res.redirect("/");
});




app.listen(process.env.PORT || 3000, function() {
  console.log("server is running on port 3000");
});
