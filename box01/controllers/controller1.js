var dbcreds = require('../../dbcreds');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extend: false});

mongoose.connect('mongodb://'+ dbcreds.user +':' + dbcreds.pw + '@ds051913.mlab.com:51913/rezdb');
var model1 = mongoose.model('rez2_collection1', mongoose.Schema({item: String}) );
var model2 = mongoose.model('rez2_collection2', mongoose.Schema({item: String}) ); //todoModel
//var data = [{item: 'get blue milk'}, {item: "re-attach 3PO's arm"}, {item: 'pickup power converters at toshi station'}];

module.exports = function(xsvr){
	var wack = 'wack';
	// get todo data and render view
	xsvr.get('/', function(req, res){

		var data1 = model1.find({}, function(err, data){
			if (err) throw err;
			//console.log('into the shoot flyboy');
			res.render('view1', {todos: data});
		});

		console.log('controller1 called');
	});

	//create new todoModel with data from req.body, push to db, reload view
	xsvr.post('/todo', urlencodedParser, function(req, res){
		var newTodo = model1(req.body).save(function(err, data){
			if (err) throw err;
			res.json(data);
		});
	});

	xsvr.delete('/todo/:id', function(req, res){
		//delete requested item from db
		wack = req.params.id;
		//item.replace(/\-/g, " ")
		model1.find( {_id: req.params.id} ).remove(function(err, data){
			if (err) throw err;
			var obj;
			for (obj in data){
				console.log('---> ' + data[obj]);
			}
			res.json(data);
		});
		console.log('deleting ' + wack);

	});

};
