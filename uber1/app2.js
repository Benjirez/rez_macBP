const express = require('express'); //package.json using: "express": "^4.16.2"
var dbcreds = require('./dbcreds');
var mongoose = require('mongoose');

mongoose.connect('mongodb://'+ dbcreds.user +':' + dbcreds.pw + '@ds051913.mlab.com:51913/rezdb');
var rez2_collection2 = mongoose.model('rez2_collection2', mongoose.Schema({item: String}) );
//const path = require('path');
//const PORT = process.env.PORT || 5000;
//var todoController = require('./controllers/todoController');
var xsvr = express();

//set up template engine
xsvr.set('view engine', 'ejs');

xsvr.get('/', function(req, res){
		
		var data = rez2_collection2.find({}, function(err, data){
			if (err) throw err;
			//console.log('into the shoot flyboy');
			console.log('/ get request made');
			res.render('app2_view1', { rez2_collection2: data } );
		});
	});

		


//static files
//xsvr.use( express.static('./public') ); //no specific route specified... thus, all requests routed to ./public
//xsvr.use(express.static(path.join(__dirname, 'public')));

//fire controllers (ie. call functions)
//todoController( xsvr ); //passing it the express server

//listen to port
xsvr.listen(3000);
//xsvr.listen(PORT, () => console.log(`Listening on ${ PORT }`))
console.log('xsvr listening on 3000');