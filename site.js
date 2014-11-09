var request = require( "request" ),
    twitter = require( "twitter" );

module.exports = function( env ){
  var twit = new twitter({
    consumer_key: env.get( "TWIT_CONSUMER_KEY" ),
    consumer_secret: env.get( "TWIT_CONSUMER_SECRET" ),
    access_token_key: env.get( "TWIT_ACCESS_KEY" ),
    access_token_secret: env.get( "TWIT_ACCESS_SECRET" )
  });

  return {
    index: function( req, res ) {
      res.render( "views/index.html", function(err, html) {
        if (err) return res.json(404, { err: err});
      });
    },
    tweet: function( req, res ) {
      var tweet = req.body && req.body.message || null;

      if ( !tweet ) {
        return res.json( 404, { error: "Why didn't you post a message? :(" });
      }

      twit.post( "/statuses/update.json", {
        status: tweet
      }, null, function( data ) {
        res.json( 200, { status: "success" });
      });
    },
  };
};
