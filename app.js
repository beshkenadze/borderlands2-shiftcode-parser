var twitter = require('ntwitter');
var email = require('mailer');

var Codes = function(text) {
	var codes = {}, re = /([(\w+)]+:).([(\w+)]{5}-[(\w+)]{5}-[(\w+)]{5}-[(\w+)]{5}.[(\w+)]{5})/gi
	var matches = text.match(re)
	codes.size = codes.size = matches ? matches.length : 0
	for (var i in matches){
		var info = matches[i].split(' ');
		var group = info[0].replace(':','')
		var key = info[1]
		if((group in codes) == false)
			codes[group] = []
		codes[group].push(key)
	};
	return codes
}
var sendEmail = function(codes) {
	email.send(
		{
		  host: "smtp.gmail.com",
		  port : "25",
		  authentication: "login",
		  username: "robot@appfolio.in",
		  password: "m8cTtG3PcNwtn",
		  to : "beshkenadze@gmail.com",
		  from : "robot@appfolio.in",
		  subject : "node_mailer test email",
		  body : "hello this a test email from the node_mailer",
		  function(err, result){
		    if(err){ console.log(err); }
		  }
  )
}
var twit = new twitter({
  consumer_key: 'pkot2LmgHHiAryFK3Y9lQw',
  consumer_secret: 'Qux1HFiPj3yvRoSYyLe35Hcb60yOYnceBWU1EwvwpsA',
  access_token_key: '13109562-4XYk4cCVoph27Up7nkL0qe3gMZSmoXKAMcIxstldR',
  access_token_secret: 'TGBqhzBOonphphap2RVCWhBIXndoGIk490bRO4baVM'
});
twit.stream('user', {track:'beshkenadze'}, function(stream) {
  stream.on('data', function (data) {
  	//([(\w+)]+:).([(\w+)]{5}-[(\w+)]{5}-[(\w+)]{5}-[(\w+)]{5}.[(\w+)]{5})
  	var codes = Codes(data.text)
    if(codes.size > 0) {
    	sendEmail(codes)
    }
  });
  stream.on('end', function (response) {
    // Handle a disconnection
  });
  stream.on('destroy', function (response) {
    // Handle a 'silent' disconnection from Twitter, no end/error event fired
  });
  // Disconnect stream after five seconds
  // setTimeout(stream.destroy, 5000);
});