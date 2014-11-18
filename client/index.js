var $ = require( "jquery" );

var input = $( "#tweet" );
$( "#submit" ).click(function( e ) {
	$.ajax('/tweet', {
		method: "POST",
		data: {
			message: input.val()
		},
		success: function( data, status, xhr ) {
			alert( "You said it!" );
		},
		error: function( xhr, status, httpStatus ) {
			alert( "What happened? " + httpStatus );
		}
	});
});