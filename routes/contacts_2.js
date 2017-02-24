var express = require('express');
var router = express.Router();
var url = require('url');
var contacts = require('../modules/contacts');
var mongoose = require('mongoose');
var dataservice = require('../modules/contactdataservice_1');



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
	console.log('Listing all contacts with ' +
		request.params.key + '=' + request.params.value);
	dataservice.list(Contact, response);
});
router.get('/contacts/:number', function(request, response) {
	console.log(request.url + ' : querying for ' +
		request.params.number);
	dataservice.findByNumber(Contact, request.params.number,
		response);
});
router.post('/contacts', function(request, response) {
	dataservice.update(Contact, request.body, response)
});
router.put('/contacts', function(request, response) {
	dataservice.create(Contact, request.body, response)
});
router.delete('/contacts/:primarycontactnumber', function(request, response) {
	dataservice.remove(Contact,
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
