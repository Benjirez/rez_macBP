const express = require('express');
const appVersion = '3';
//const path = require('path');
//const PORT = process.env.PORT || 5000;
var controller1 = require( ('./controllers/controller1_app'+appVersion) );
var xsvr = express();

//set up template engine
xsvr.set('view engine', 'ejs');

//static files
xsvr.use( express.static('./public') ); //no specific route specified... thus, all requests routed to ./public
//xsvr.use(express.static(path.join(__dirname, 'public')));

//fire controllers (ie. call functions)
controller1( xsvr ); //passing it the express server

//listen to port
xsvr.listen(3000);
//xsvr.listen(PORT, () => console.log(`Listening on ${ PORT }`))
console.log('app' + appVersion + ' xsvr listening on 3000');