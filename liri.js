
var dotenv= require("dotenv").config();
var Spotify = require("node-spotify-api")
var request = require('request');
var fs = require('fs');
var keys = require("./keys.js");
var moment = require("moment");

//take in command line
var lastCommand= process.argv[2];
// var command= process.argv[3];
var input= process.argv[3];

//construct a switch statement to execute certain block of code//
function run(command, input){

switch(command){
      case "concert-this":
      concert(input);
      break;

      case "spotify-this-song":
      spotify(input);
      break;

      case "movie-this":
      movie(input);
      break;

      case "do-what-it-says":
      says(input);
      break;
}
}


function concert(input) {

// // Then run a request to the BandsInTown API with the movie specified
var queryUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";

     console.log(queryUrl);

     request(queryUrl, function(error, response, body) {
      if (!input){
            input = 'The Sign';
    	}
      // If the request is successful
      if (!error && response.statusCode === 200) {
      
        console.log(JSON.parse(body)[0].venue.name);
        console.log(JSON.parse(body)[0].venue.city);
        var time= JSON.parse(body)[0].datetime;
        console.log(moment(time).format("MM/DD/YY hh:mm:ss"));

    }

  });

};


function spotify(input){ 

    var spotify = new Spotify(keys.spotify)
    
      spotify.search({ type: 'track', query: input }, function(err, data) {
      if (err) {
      return console.log('Error occurred: ' + err);
    }
    var song = data.tracks.items[0];
    console.log("Artists: ");
    for(i=0; i<song.artists.length; i++){
    	console.log(song.artists[i].name);
    }

    console.log("Song Name: " + song.name);

	console.log("Preview Link:" + song.preview_url);

    console.log("Album:"+ song.album.name);

    
    })
    
};

function movie(input){

    var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";

	 request(queryUrl, function(error, response, body) {
		if (!input){
        	input = 'Mr Nobody';
    	}
		if (!error && response.statusCode === 200) {

		    console.log("Title: " + JSON.parse(body).Title);
		    console.log("Release Year: " + JSON.parse(body).Year);
		    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
		    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
		    console.log("Country: " + JSON.parse(body).Country);
		    console.log("Language: " + JSON.parse(body).Language);
		    console.log("Plot: " + JSON.parse(body).Plot);
		    console.log("Actors: " + JSON.parse(body).Actors);
		}
	});
};


function says(){
    fs.readFile('random.txt', "utf8", function(error, data){
      var txt = data.split(',');
  
      spotify(txt[1]);
    });
  }




// function says(){

//     fs.readFile("random.txt", "utf8", function(err,data) {
//          if(err) {
//              return console.log(err);
//          }

//          var dataTxt = data.split(", ");
//          var slice= dataTxt[0].slice(0, -1);

//          if (slice==="spotify-this-song"){
//             run(dataTxt[0],dataTxt[1]);
//          }
    
         
//     });
// }


run(lastCommand,input);







