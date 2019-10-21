require("dotenv").config();                //Setup the environment variables.
var fs      = require("fs");               //fs package to handle read/write/append.
var Spotify = require("node-spotify-api"); //Spotify API.
var axios   = require("axios");            //Axios variable.
var moment  = require("moment");           //Moment for time display.
var keys    = require("./keys.js");        //Get the application keys.

//Separate the keys into variables.
var spotifyId     = keys.spotify.id;
var spotifySecret = keys.spotify.secret;
var bandsKey      = keys.bands.key;
var omdbKey       = keys.omdb.key;

//Create a Spotify reference.
var spotify = new Spotify(
{
    id: spotifyId,
    secret: spotifySecret
});

//Process command line input.
runLIRI(process.argv[2], process.argv[3]);

/*************************************** Run LIRI Function ***************************************/

//Decide what to do based on the user input.
function runLIRI(cmd, par)
{
    switch(cmd.toLowerCase())
    {
        //node liri.js concert-this <artist/band name here>
        case "concert-this":
            doConcert(par);
            break;

        //node liri.js spotify-this-song <song name here>
        case "spotify-this-song":
            doSpotify(par);
            break;

        //node liri.js movie-this <movie name here>
        case "movie-this":
            doMovie(par);
            break;

        //node liri.js do-what-it-says
        case "do-what-it-says":
            doRandom();
            break;

        //node liri.js show-log
        case "show-log":
            showLog();
            break;

        //Invalid input.
        default:
            console.log("Unrecognized command");
            break;
    }
}

/***************************************** API Functions *****************************************/

//---------------------------- Bands In Town -----------------------------
function doConcert(par)
{
    if(par === undefined) //Check if band information is defined.
    {
        console.log("Band information must be provided.");
        return;
    }

    //Query the Bands in Town database.
    axios.get("https://rest.bandsintown.com/artists/" + par + "/events?app_id=" + bandsKey)
    .then(function(response)
    {
        let data = response.data; //Get the response data object.

        //Check if there are any venue results. If not, exit.
        if(!data[0].venue)
        {
            console.log("No results found!");
            return;
        }

        //Prepare a text string for the log file.
        let logText = "********************* concert-this: " + par + " *********************\n";

        //The response can be multiple objects.  Loop through them and print them all.
        for(let i = 0; i < data.length; i++)
        {
            let venuInfo = data[i].venue;

            //Get the date of the event and format it with moment.
            let date = moment(data[i].datetime);

            //Generate strings for user and log file.
            let venuHead  = "---------- Venue Information ----------";
            let venueName = "Venue Name: " + venuInfo.name;
            let venueLoc  = "Venue Location: " + venuInfo.city + " " +  
                             venuInfo.region + ", " + venuInfo.country;
            let venueDate = "Event Date: " + date.format("MM/DD/YYYY") + "\n";

            //Generate string for the console and the log file.
            let datStr = venuHead + "\n" + venueName + "\n" + venueLoc + "\n" + venueDate;
            
            console.log(datStr); //Write results to the display.
            logText += datStr  + "\n"; //Format text string for log file append.
        }

        //Write the search results to the log file.
        fs.appendFile("log.txt", logText, function(err)
        {
            if (err) //Log any errors.
            {
                console.log(err);
            }
        });
    })
    .catch(function(error)
    {    
        //Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
    });
}

//------------------------------- Spotify --------------------------------
function doSpotify(par)
{
    //Check if no song was provided.
    if(par === undefined)
    {
        par = "the sign"; //Default to Ace of Base "The Sign".
    }

    //Prepare a text string for the log file.
    let logHead = "********************* spotify-this-song: " + par + " *********************\n";
    fs.appendFile("log.txt", logHead, function(err)
    {
        if (err) //Log any errors.
        {
            console.log(err);
        }    
    });

    //Query the Spotify database.
    spotify.search({ type: "track", query: par, limit: 20 }, function(err, data)
    {
        //If an error occurs, print the error info and quit.
        if (err)
        {
            return console.log('Error occurred: ' + err);
        }
       
        let trackArr = data.tracks.items; //Get the results of the query.

        //Loop through the results and extract the relevant information.
        for(let i = 0; i < trackArr.length; i++)
        {
            //Generate strings for user and log file.
            let songHead  = "---------- Song Information ----------";
            let artist    = "Artist: " + trackArr[i].artists[0].name;
            let song      = "Song Name: " + trackArr[i].name;
            let link      = "Preview Link: " + ((!trackArr[i].preview_url) ? 
                            "None" : trackArr[i].preview_url);
            let album     = "Album: " + trackArr[i].album.name  + "\n";

            //Generate string for the console and the log file.
            let datStr = songHead + "\n" + artist + "\n" + song + "\n" + link + "\n" + album;
            
            console.log(datStr); //Write results to the display.
            let logText = datStr  + "\n"; //Format text string for log file append.

            //Write the search results to the log file.
            fs.appendFile("log.txt", logText, function(err)
            {
                if (err) //Log any errors.
                {
                    console.log(err);
                }
            });
        }
    });
}



















//--------------------------------- OMDB ---------------------------------
function doMovie(par)
{
    axios.get("http://www.omdbapi.com/?t=" + par + "&apikey=" + omdbKey)
    .then(function(response)
    {
        //Extract the data from the request.
        var data = response.data;

        //Display the movie information.
        console.log("\nMovie Title: " + data.Title);
        console.log("Release:" + data.Released);
        console.log("IMDB Rating: " + data.Ratings[0].Value);
        console.log("Rotten Tomatoes Rating: " + data.Ratings[1].Value);
        console.log("Prduced in Countries: " + data.Country);
        console.log("Movie Language: " + data.Language);
        console.log("Plot: " + data.Plot);
        console.log("Actors: " + data.Actors);
    })
    .catch(function(error)
    {    
        //Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
    });
}

//--------------------------- Text File Access ---------------------------
function doRandom()
{

}

//------------------------------- Show Log -------------------------------
function showLog()
{
    fs.readFile("log.txt", "utf8", function(error, data)
    {
        //Report any errors.
        if (error) 
        {
            return console.log(error);
        }
      
        //Print log to the console.
        console.log(data);  
    });
}