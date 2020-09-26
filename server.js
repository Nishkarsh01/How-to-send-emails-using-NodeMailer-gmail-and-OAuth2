const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());

app.get('/',function(req,res){
res.send({
message:'Default route in email tutorial project'
})
});

const myOAuth2Client = new OAuth2(
"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",//client id
"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",//client secret
"https://developers.google.com/oauthplayground"
)

myOAuth2Client.setCredentials({
refresh_token:"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"//the refresh token
});

const myAccessToken =  myOAuth2Client.getAccessToken()

const transport = nodemailer.createTransport({
     service: "gmail",
     auth: {
          type: "OAuth2",
          user: "theEmail@gmail.com", //your gmail account you used to set the project up in google cloud console"
          clientId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",//client id
          clientSecret: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",//client secret
          refreshToken: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",//the refresh token
          accessToken: myAccessToken //access token variable we defined earlier
     }});


app.post('/',function(req,res){
	const mailOptions = {
from: 'senderEmail@gmail.com', // sender
to: 'recieverEmail@gmail.com', // receiver
subject: 'My tutorial brought me here', // Subject
html: '<p>You have received this email using nodemailer, you are welcome ;)</p>'// html body
}

transport.sendMail(mailOptions,function(err,result){
if(err){
res.send({
message:err
})
}else{
transport.close();
console.log("sent");
res.send({
message:'Email has been sent: check your inbox!'
})
}
})

});





app.listen(PORT, function (req, res) {
console.log(`Listening on port ${PORT}`);
})