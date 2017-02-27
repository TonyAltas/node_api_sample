var express = require('express');
var router = express.Router();
var url = require('url');
var contacts = require('../modules/contacts');
var mongoose = require('mongoose');
var dataserviceV2 = require('../modules/contactdataservice_2');

//var Grid = require('gridfs-stream');
//
//var mongodb = mongoose.connection;
//var gfs = Grid(mongodb.db, mongoose.mongo);

//var contactSchema = new mongoose.Schema({
//	primarycontactnumber: {type: String, index: {unique:
//	true}},
//	 firstname: String,
//	 lastname: String,
//	 title: String,
//	 company: String,
//	 jobtitle: String,
//	 othercontactnumbers: [String],
//	 primaryemailaddress: String,
//	 emailaddresses: [String],
//	 groups: [String]
//});
//var Contact = mongoose.model('Contact', contactSchema);
var Contact = require('../model/contact.js');



/* GET home page. */
//router.get('/contacts', function(req, res, next) {
//	var get_params = url.parse(req.url, true).query;
//	if (Object.keys(get_params).length === 0){
//		res.setHeader('content-type', 'application/json');
//		res.end(JSON.stringify(contacts.list()));
//	}
//	else {
//		res.setHeader('content-type', 'application/json');
//		res.end(JSON.stringify(contacts.query_by_arg(get_params.arg,
//					get_params.value)));
//	}
//});

router.get('/contacts', function(request, response) {
	var get_params = url.parse(request.url, true).query;
	if (Object.keys(get_params).length == 0)
{
	console.log('Listing all contacts with ' +
		request.params.key + '=' + request.params.value);
	dataserviceV2.list(Contact, response);
}
	else {
		var key = Object.keys(get_params)[0];
		var value = get_params[key];
		JSON.stringify(dataserviceV2.query_by_arg(Contact, key,value, response));
	}
});
router.get('/contacts/:number', function(request, response) {
	console.log(request.url + ' : querying for ' +
		request.params.number);
	dataserviceV2.findByNumber(Contact, request.params.number,
		response);
});
router.post('/contacts', function(request, response) {
	dataserviceV2.update(Contact, request.body, response)
});
router.put('/contacts', function(request, response) {
	dataserviceV2.create(Contact, request.body, response)
});
router.delete('/contacts/:primarycontactnumber', function(request, response) {
	dataserviceV2.remove(Contact,
		request.params.primarycontactnumber, response);
});




//router.get('/contacts/:number', function(req, res) {
//	res.setHeader('content-type', 'application/json');
//	res.end(JSON.stringify(contacts.query(req.params.number)));
//});
//
//router.get('/groups', function(req, res) {
//	console.log('groups');
//	res.setHeader('content-type', 'application/json');
//	res.end(JSON.stringify(contacts.list_groups()));
//});
//
//router.get('/groups/:name', function(req, res){
//	console.log('groups');
//	res.setHeader('content-type', 'application/json');
//	res.end(JSON.stringify(contacts.get_members(req.params.name)));
//});

module.exports = router;
