var dbcreds = require('../dbcreds');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extend: false});

mongoose.connect('mongodb://'+ dbcreds.user +':' + dbcreds.pw + '@ds051913.mlab.com:51913/rezdb');
var todoModel = mongoose.model('rez2_collection2', mongoose.Schema({item: String}) );
//var data = [{item: 'get blue milk'}, {item: "re-attach 3PO's arm"}, {item: 'pickup power converters at toshi station'}];

module.exports = function(xsvr){

	// get todo data and render view
	xsvr.get('/', function(req, res){
		var data = todoModel.find({}, function(err, data){
			if (err) throw err;
			//console.log('into the shoot flyboy');
			res.render('todo', {todos: data});
		});

		console.log('todo called');
	});

	//create new todoModel with data from req.body, push to db, reload view
	xsvr.post('/todo', urlencodedParser, function(req, res){
		var newTodo = todoModel(req.body).save(function(err, data){
			if (err) throw err;
			res.json(data);
		});
	});

	xsvr.delete('/todo/:item', function(req, res){
		//delete requested item from db
		todoModel.find( {item: req.params.item.replace(/\-/g, " ")} ).remove(function(err, data){
			if (err) throw err;
			res.json(data);
		});
	});

};
