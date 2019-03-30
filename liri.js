require("dotenv").config();

var keys = require("./keys.js");

var axios = require('axios');

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var value = process.argv[3];

function getMeSpotify(item) {
    spotify.search({ type: 'track', query: item, limit: 3 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data); 
      });
}

function getMyBands(artist) {

    var url = 'https://rest.bandsintown.com/artists/'  + artist  +  '/events?';
    // Optionally the request above could also be done as
    axios.get(url, {
            params: {
                app_id: 'codingbootcamp'
            }
        })
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}


switch(command) {
    case 'concert-this':
        getMyBands(value);
        break;
    case 'spotify-this-song':
        getMeSpotify(value);
        break;

    default:
        console.log('Please enter the following \n liri spotify-this-song song_name \n liri concert-this band_name');
};