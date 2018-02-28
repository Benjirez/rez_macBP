const express = require('express');
//const path = require('path');
//const PORT = process.env.PORT || 5000;
var todoController = require('./controllers/todoController');
var xsvr = express();

//set up template engine
xsvr.set('view engine', 'ejs');

//static files
xsvr.use( express.static('./public') ); //no specific route specified... thus, all requests routed to ./public
//xsvr.use(express.static(path.join(__dirname, 'public')));

//fire controllers (ie. call functions)
todoController( xsvr ); //passing it the express server

//listen to port
xsvr.listen(3000);
//xsvr.listen(PORT, () => console.log(`Listening on ${ PORT }`))
console.log('xsvr listening on 3000');