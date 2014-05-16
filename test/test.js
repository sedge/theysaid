var assert = require( "assert" ),
    fork = require( "child_process" ).fork,
    request = require( "request" ),
    now = Date.now(),
    env = require( "../environment" ),
    child,
    host = env.get( "HOST" );

/**
 * Server functions
 */

function startServer( done ) {
  // Spin-up the server as a child process
  child = fork( "app.js", null, {} );

  // Listen for success, or error with the DB
  child.on( 'message', function( msg ) {
    if ( msg === 'sqlStarted' ) {
      return done();
    }

    throw "What happened with the fork?";
  });
  child.on( 'error', function(err) {
    console.error( err );
    child.kill();
  });
}

function stopServer( done ) {
  child.kill();
  done();
}

/**
 * Api functions
 */

function apiHelper( verb, uri, httpCode, data, callback, customAssertions ) {
  // Parameter handling
  if ( typeof( data ) === "function" ) {
    callback = data;
    data = {};
  } else {
    data = data || {};
  }
  callback = callback || function(){};
  customAssertions = customAssertions || function( err, res, body, callback) {
    callback( err, res, body );
  };
  var assertion = function ( err, res, body, callback ) {
    if ( !body ) {
      err = err || "No response body found!";
    }

    assert.ok( !err );
    assert.equal( res.statusCode, httpCode );
    customAssertions( err, res, body, callback );
  };

  request({
    url: uri,
    method: verb,
    json: data
  }, function( err, res, body ) {
    var user;

    if ( err ) {
      return callback( err );
    }

    assertion( err, res, body, callback );
  });
}

function unique() {
  return ( ++now ).toString( 36 );
}

/**
 * Unit tests
 */

describe( "POST /tweet", function() {

  var api = host + 'tweet';

  before( function( done ) {
    startServer( done );
  });

  after( function( done ) {
    stopServer( done );
  });

  it( 'should post a new tweet when passed valid information', function ( done ) {
    apiHelper( 'post', api, 200, { message: unique() }, done, function ( err, res, body, done ) {
      assert.equal( body.status, "success" );
      done();
    });
  });
});

