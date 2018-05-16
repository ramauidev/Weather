const express = require('express');
const cors = require('cors');
const DarkSkyApi = require('dark-sky-api');
const bodyParser = require('body-parser');
const googleMaps = require('@google/maps');
const async = require('async');
const app = express();
app.use(bodyParser.json());
app.use(cors());

const googleClient = googleMaps.createClient({key: ''}); //google API Key.
DarkSkyApi.apiKey = ''; //darkskyp API Key
DarkSkyApi.proxy = true;


global.navigator = {
    userAgent: 'node.js'
};

app.listen(8000, () => {
    console.log('Server Started');
});

app.route('/api/getLocationGeoCodes/:city').get((req, res) => {
    const address = ',' + req.params['city'];
    googleClient.geocode({address: address}, function (err, response) {
        if (!err) {
            res.status(200).send(response.json.results);
        }
    });
});

function getLastWeek() {
    var i = 0;
    var currentDate = new Date();
    var pastWeekDates = [];
    pastWeekDates.push(new Date().toISOString().substr(0,19)+'Z');
    while (i < 7) {
        pastWeekDates.push(new Date(currentDate.setDate(currentDate.getDate() - 1)).toISOString().substr(0,19)+'Z');
        i++;
    }
    return pastWeekDates;
}

app.route('/api/getWeatherForLocation/:latitude/:longitude').get((req, res) => {
    const position = {
        latitude: req.params['latitude'],
        longitude: req.params['longitude']
    };
    var response=[];
    var dates = async.queue(function(data, callback){
        DarkSkyApi.loadTime(data, position).then(result => {
            response.push(result);
            callback(null);
        }, err => console.log(err));
    }, 1);
    dates.drain = function() {
        res.send(response);
    }
    dates.push(getLastWeek());
});
