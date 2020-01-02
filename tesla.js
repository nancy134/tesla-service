const rp = require('request-promise');

exports.vehicles = function(access_token){
    return new Promise(function(resolve, reject){
        url = process.env.TESLA_URI + "/api/1/vehicles"
        var bearerToken = "Bearer "+access_token;
        var headers = {
            "Authorization" : bearerToken,
            "User-Agent" : "NP Software Fleet Management/1.0"
        }
        var options = {
            uri: url,
            headers: headers,
            json: true
        };
        console.log("options: "+JSON.stringify(options));
        rp(options).then(function(resp){
            resolve(resp);
        })
        .catch(function(err){
            reject(err);
        });
    });
}
