// External Dependencies
var express = require( "express" ),
    env     = require( "./environment" ),
    path    = require( "path" );

// Internal Dependencies
var site = require( "./site" )( env );

var http = express();

http.configure(function() {
  // Conceal the fact we're using nodejs
  http.disable( "x-powered-by" );

  http.use( express.static( path.join( __dirname, "public" ) ) );

  http.use( express.json() );
  http.use( express.bodyParser() );
});

// Route declaration
http.post( "/tweet", site.tweet );

http.listen( env.get( "PORT" ), function() {
  console.log( "HTTP server listening on port " + env.get( "PORT" ) + "." );
});

// FOR MOCHA TESTING:
// If we're running as a child process, let our parent know we're ready.
if ( process.send ) {
  try {
    process.send( "sqlStarted" );
  } catch ( e ) {
    // exit the worker if master is gone
    process.exit(1);
  }
}



