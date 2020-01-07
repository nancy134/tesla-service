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
  res.send('Hello tesla-api.phowma.com ('+process.env.USER_AGENT+')');
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
app.get('/vehicle/:id/drive_state', (req, res) => {
    var token = getToken(req);
    var driveStatePromise = tesla.drive_state(token,req.params.id);
    driveStatePromise.then(function(results){
        res.json(results);
    }).catch(function(err){
        res.status(err.statusCode).json(err.error);
    });
});

app.get('/vehicle/:id', (req, res) => {
    var token = getToken(req);
    if (!req.params.id) res.send("id is not defined");
    else {
    var vehiclePromise = tesla.vehicle(token,req.params.id);
    vehiclePromise.then(function(results){
        res.json(results);
    }).catch(function(err){
        res.json(err.error);
    });
    }
});

app.get('/vehicle/:id/location', (req, res) => {
    var token = getToken(req);
    var driveStatePromise = tesla.drive_state(token,req.params.id);
    driveStatePromise.then(function(results){
        var result = {
            id: req.params.id,
            latitude: results.response.latitude,
            longitude: results.response.longitude,
            speed: results.response.speed
        };

        res.json(result);
    }).catch(function(err){
        var result = {
            id: req.params.id,
            latitude: 0,
            longitude: 0,
            speed: 0 
        };
        res.json(result);
    });
});

app.listen(PORT, HOST);
