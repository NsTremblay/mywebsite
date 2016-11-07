module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

	app.get('/skills/:skill', function(req, res) {

	  // Gets the patient_id parameter in URL and searches for it
	  Skill.find({ name: req.params.skill }, function(err, skills) {
	    // Returns a single patient
	    console.log()
	    res.json(skills);
	  });
	});

};