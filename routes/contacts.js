var express = require('express');
var router = express.Router();
var url = require('url');
var contacts = require('../modules/contacts');

/* GET home page. */
router.get('/contacts', function(req, res, next) {
	var get_params = url.parse(req.url, true).query;
	if (Object.keys(get_params).length === 0){
		res.setHeader('content-type', 'application/json');
		res.end(JSON.stringify(contacts.list()));
	}
	else {
		res.setHeader('content-type', 'application/json');
		res.end(JSON.stringify(contacts.query_by_arg(get_params.arg,
					get_params.value)));
	}
});

router.get('/contacts/:number', function(req, res) {
	res.setHeader('content-type', 'application/json');
	res.end(JSON.stringify(contacts.query(req.params.number)));
});

router.get('/groups', function(req, res) {
	console.log('groups');
	res.setHeader('content-type', 'application/json');
	res.end(JSON.stringify(contacts.list_groups()));
});

router.get('/groups/:name', function(req, res){
	console.log('groups');
	res.setHeader('content-type', 'application/json');
	res.end(JSON.stringify(contacts.get_members(req.params.name)));
});

module.exports = router;
