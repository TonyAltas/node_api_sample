var mongoose = require('mongoose');
var chai = require('chai');
var assert = chai.assert;
var prepare = require('./prepare');

mongoose.connect('mongodb://localhost/contacts-test');

var contactSchema = new mongoose.Schema({
	primarycontactnumber: {type: String, index: {unique: true}},
	 firstname: String,
	 lastname: String,
	 title: String,
	 company: String,
	 jobtitle: String,
	 othercontactnumbers: [String],
	 primaryemailaddress: String,
	 emailaddresses: [String],
	 groups: [String]
});

var Contact = mongoose.model('Contact', contactSchema);

describe('Contact: models', function() {

	describe('#create()', function(){
		it('Should create a new Contact', function (done) {
			var contactModel = {
				"firstname":"John",
			"lastname":"Douglas",
			"title":"Mr.",
			"company":"Dev Inc.",
			"jobtitle":"Developer",
			"primarycontactnumber":"+359777223345",
			"primaryemailaddress":"john.douglas@xyz.com",
			"groups":["Dev"],
			"emailaddresses":["j.douglas@xyz.com"],
			"othercontactnumbers":
			['+359777223346','+359777223347']
			};

			Contact.create(contactModel, function (err, createdModel){
				// Check that no error occurred
				assert.isNull(err, 'There was no error');
				assert.equal(createdModel.firstname, "John" );
				assert.equal(createdModel.lastname, "Douglas");
				assert.equal(createdModel.title, "Mr.");
				assert.equal(createdModel.jobtitle, "Developer");
				assert.equal(createdModel.primarycontactnumber, "+359777223345");
				assert.equal(createdModel.primaryemailaddress, "john.douglas@xyz.com");
				assert.equal(createdModel.groups[0], "Dev");
				assert.equal(createdModel.emailaddresses[0], "j.douglas@xyz.com");
				assert.equal(createdModel.othercontactnumbers[0], "+359777223346");
				assert.equal(createdModel.othercontactnumbers[1], "+359777223347");
				done();
			});

		});
	});

});
