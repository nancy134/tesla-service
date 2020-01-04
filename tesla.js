const rp = require('request-promise');

exports.vehicles = function(access_token){
    return new Promise(function(resolve, reject){
        url = process.env.TESLA_URI + "/api/1/vehicles"
        var bearerToken = "Bearer "+access_token;
        var headers = {
            "Authorization" : bearerToken,
            "User-Agent" : process.env.USER_AGENT
        }
        var options = {
            uri: url,
            headers: headers,
            json: true
        };
        rp(options).then(function(resp){
            resolve(resp);
        })
        .catch(function(err){
            reject(err);
        });
    });
}

exports.vehicle = function(access_token, id){
    return new Promise(function(resolve, reject){
        url = process.env.TESLA_URI + "/api/1/vehicles/" + id + "/vehicle_data"
        var bearerToken = "Bearer "+access_token;
        var headers = {
            "Authorization" : bearerToken,
            "User-Agent" : process.env.USER_AGENT 
        }
        var options = {
            uri: url,
            headers: headers,
            json: true
        };
        rp(options).then(function(resp){
            resolve(resp);
        })
        .catch(function(err){
            reject(err);
        });
    });
}

exports.drive_state = function(access_token, id){
    return new Promise(function(resolve, reject){
        url = process.env.TESLA_URI + "/api/1/vehicles/" + id +
            "/data_request/drive_state";
        var bearerToken = "Bearer "+access_token;
        var headers = {
           "Authorization" : bearerToken,
            "User-Agent" : process.env.USER_AGENT 
        };
        var options = {
            uri: url,
            headers: headers,
            json: true
        };
        rp(options).then(function(resp){
            resolve(resp);
        })
        .catch(function(err){
            reject(err);
        });
    });
}
