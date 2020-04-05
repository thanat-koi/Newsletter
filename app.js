const request = require("request");
const express = require("express");
const bodyParser = require("body-parser");
const port = 3000 ;
const app = express();
const https = require("https");

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extends: true}))

app.get('/',(req, res) => res.sendFile(__dirname + "/signup.html"))
app.post('/', (req, res) => {

const firstName = req.body.fname;
const lastName = req.body.lname;
const email = req.body.email;
const data = {
    members: [
        {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName

            }
        }
    ]
};
const jsonData = JSON.stringify(data);
const url = "https://us19.api.mailchimp.com/3.0/lists/53caad4bc0"; 
const option = {
    method: "POST",
    auth: "thanat:bfc25c22a8e1dcf606ff2af602d7f608-us19" 

}

const request = https.request(url, option, (response) => {
console.log(response)
    if (response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
    }   else{
        res.sendFile(__dirname +"/failure.html");
    }

    response.on("data", function (data)  {
        console.log(JSON.parse(data));
    })
})
    //request.write(jsonData);
    request.end();

});

    app.post('/failure', (req, res) => res.redirect('/'));
app.listen(port, () => console.log("hello"));


//bfc25c22a8e1dcf606ff2af602d7f608-us19
//53caad4bc0 