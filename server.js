const express = require('express')
const PORT = process.env.PORT || 3000;

const app = express()

const request = require('request');
const bodyParser = require("body-parser");

app.use(express.static('angular-assignment'))


const backendURL = process.env.BACKEND_URL||"http://localhost:8090";

const frontendURL = '/server';

app.get(frontendURL, (req, res) => {
	request(backendURL + '/api/user', { json: true }, (err, resp, body) => {
	  if (err || !body) {
	  	  res.send("Error while getting users from "+backendURL) 
	  } else{
		  res.send(body);
	  }
	  
	});
})

app.get(frontendURL +'/test', (req, res) => {
	request(backendURL+ '/api/user/test', { json: true }, (err, resp, body) => {
	  if (err || !body) {
	  	  res.send("Error while getting users from "+backendURL) 
	  } else{
		  res.send(body);
	  }
	  
	});
})


/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
    extended: true
}));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.post(frontendURL, (req, res) => {
    request.post({
        url: backendURL + '/api/user',
        body: req.body,
        json: true
      }, function(err, resp, body){
		if (err || !body) {
	  	  res.send("Error while getting users from "+backendURL) 
	  } else{
		  res.send(body);
	  }
    })
})

app.listen(PORT, () => console.log('UI service listening on port ' + PORT + '!'))
