# liri-node-app
### Problem Statement
This assignment is an exercise designed to explore the capabilities on Node.js and several of its packages.  It is a required assignment for coding bootcamp.

### High-level Overview
This program is a command line LIRI-bot (Language Interpretation and Recognition Interface).  It can search movie, concert and Spotify databases by movie title, band name and song title respectively.  Information will then be returned via the command line interface to the user.

### App Instructions
Five different commands are recognozed by the application.  The commands are the following:

1. `concert-this '<Artist Name>'`
2. `spotify-this-song '<Song Name>'`
3. `movie-this '<Movie Name>'`
4. `do-what-it-says`
5. `show-log`

The parameter in the angle brackets should be provided by the user.  If no argument is provided with the `concert-this` command, the app wil inform the user that a band name must be entered and will return to the command line.  The `spotify-this-song` and `movie-this` commands will do a database query with preset arguments.  `spotify-this-song` will add the parameter "The Sign" by Ace of Base.  `movie-this` will add the parameter "Mr Nobody".  Both the `concert-this` and `spotify-this-song` commands will return a maximum of 20 results.  The `movie-this` command will only return a single result.

The `do-what-it-says` command takes no parameters and reads a text string from a CSV file and performs a query.  The data string is read from the file "random.txt".

A fifth command has been added to display a log of all user requests and responses.  `show-log` reads the entire contents of the "log.txt" file and displays it in the command console.  `show-log` takes no parameters.

### App GIFs
GIFs of the four required commands working can be found at the following links:
1. `concert-this metallica`: <https://github.com/nmikstas/liri-node-app/blob/master/gifs/concert_this.gif>
2. `spotify-this-song "enter sandman"`: <https://github.com/nmikstas/liri-node-app/blob/master/gifs/spotify_this_song.gif>
3. `movie-this "blade runner"`: <https://github.com/nmikstas/liri-node-app/blob/master/gifs/movie_this.gif>
4. `do-what-it-says`: <https://github.com/nmikstas/liri-node-app/blob/master/gifs/do_what_it_says.gif>

### App Source Link
The application source code can be found at the following link: <https://github.com/nmikstas/liri-node-app>

### Technologies Used
The following packages were used in this assignment:
1. `axios`
2. `dotenv`
3. `moment`
4. `node-spotify-api`

Axios is used to query the Bands in Town and Online Movie Database servers.  The Node Spotify API is used to query the Spotify database for song information.  `dotenv` is used for hiding the application IDs.  Finally, the Moment.js package is used to convert concert dates into formats easily read by users.

### My Development Role
As this is an individual homework assignment, I was soely responsible for its design and implementation.
