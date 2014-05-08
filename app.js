// External Dependencies
var express = require( "express" ),
    env = require( "./environment" );

// Internal Dependencies
var site = require( "./site" )( env );

var http = express();

http.configure(function() {
  // Conceal the fact we're using nodejs
  http.disable( "x-powered-by" );

  http.configure( "development", function(){
    http.use( express.errorHandler({ dumpExceptions: true, showStack: true }) );
  });
  http.configure( "production", function(){
    http.use( express.errorHandler() );
  });

  // Route declaration
  http.get( "/", site.index );
  http.post( "/", site.tweet );
}

