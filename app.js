const express = require("express");
const request = require("request");

const bodyParser = require("body-parser");
const { response } = require("express");

const https = require("https");


const app = express();

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}));





app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html")
})





app.post("/", function(req, res) {
    const firstName = req.body.fName;
    const lName = req.body.lName;
    const email = req.body.email;





 //data object
const data = {
    members: [
        {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lName
            }

        }
    ]
}





    //data object ends

    const jsonData = JSON.stringify(data);


    const url = "https://us5.api.mailchimp.com/3.0/lists/09e59859d3"

    const options = {
        method: "POST",
        auth: "diana5:e8ae4535deec40a3c90969fd33b8f904-us5"
    }








const request = https.request(url, options, function(response) { 


    if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html")
    } else {
        res.sendFile(__dirname + "/failure.html")
    }


    response.on("data", function(data) {
    console.log(JSON.parse(data))
        })
    })
 

request.write(jsonData);
request.end();



})


app.post("/failure", function(req, res) {
    res.redirect("/");
})







app.listen(process.env.PORT || 3000, function() {
    console.log("Server is up and running 🏃");
})



//API Key For Mailchimp
//e8ae4535deec40a3c90969fd33b8f904-us5

//List ID
//09e59859d3

// (¬‿¬) 
