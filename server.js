'use strict';

const express = require('express');
const tesla = require('./tesla');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

function getToken(req){
    var authorization = req.get("Authorization");
    var array = authorization.split(" ");
    var token = array[1];
    return token;
}

app.get('/', (req, res) => {
  res.send('Hello tesla-api.phowma.com');
});

app.get('/vehicles', (req, res) => {
    var token = getToken(req);
    var vehiclesPromise = tesla.vehicles(token);
    vehiclesPromise.then(function(result){
        res.json(result);
    }).catch(function(err){
        res.send(err);
    });
});

app.listen(PORT, HOST);
