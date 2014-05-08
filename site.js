var twit = (require( "twitter" )({

});

module.exports = function( env ){
  var twit = (require( "twitter" )({
    consumer_key: env.get( "TWIT_CONSUMER_KEY" ),
    consumer_secret: env.get( "TWIT_CONSUMER_SECRET" ),
    access_token_key: env.get( "TWIT_ACCESS_KEY" ),
    access_token_secret: env.get( "TWIT_ACCESS_SECRET" )
  });

  return {
    index: function( req, res ) {
      res.render( "./index.html" );
    },
    tweet: function( req, res ) {
      var tweetInfo = req.body;

      // Send/queue tweet
    },
  };
}
