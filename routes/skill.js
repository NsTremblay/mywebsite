//============================================================================================
// MODEL
//============================================================================================

// Load the Patient model
var Skills = require('../model/skills');

//============================================================================================
// ROUTES TO RETRIEVE RESOURCES FROM MONGODB
//============================================================================================

module.exports = function(app) {

//*********************************************************
// Get all patients
//*********************************************************
app.get('/api/skills', function (req, res) {
  console.log("called the skills");
  // Gets the patient_id parameter in URL and searches for it
  Skills.find({ sID: req.params.skillName }, function(err, patients) {
    console.log(patients);
    // Returns a single patient
    res.json(patients);
  });
})

};

