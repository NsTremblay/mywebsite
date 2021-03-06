angular.module('MainCtrl', []).controller('MainController',['$scope','Skills', function($scope, Skills) {

	$scope.getSkill  = function(skill){
    	$scope.skill = skill;
    	// console.log(skill)

    	Skills.getSkillInfo(skill)
    	//MongoClient.connect(URL, function(err, db) {
		  //   if (err) return
		    
		  //   var collection = db.collection('foods')
		  //   collection.insert({name: 'taco', tasty: true}, function(err, result) {
		  //     collection.find({name: 'taco'}).toArray(function(err, docs) {
		  //       console.log(docs[0])
		  //       db.close()
		  //     })
		  //   })
		  // })
    }

    var currentPictureWidth;
	var newPictureWidth;
	var newRatio;
    function resizeAreas(ratio){
    	//since there is no streching in the image, we can simply change all the coordinates
    	//reset the rects 
	    for (var i = list.length - 1; i >= 0; i--) {
	    	var coordinates = list[i].getAttribute("coords").split(',');
			coordinates[0] = coordinates[0]*ratio;
			coordinates[1] = coordinates[1]*ratio;
			coordinates[2] = coordinates[2]*ratio;
			coordinates[3] = coordinates[3]*ratio;
			list[i].setAttribute("coords",coordinates.toString());
	    }
	    // console.log(ratio)
    }

    $scope.$on('$viewContentLoaded', function(){
	    //Here your view content is fully loaded !!
	    //new height, recalculate the areas
	    var image = document.getElementById("wordImage");
	    image.setAttribute("style", "width:100%;");
	    newPictureWidth = image.offsetWidth;
	    var newRatio = newPictureWidth/406;
	    resizeAreas(newRatio);
	    currentPictureWidth = newPictureWidth;
	  });

    var list = document.getElementsByTagName("area");
    	
	var waitForFinalEvent = (function () {
	  var timers = {};
	  return function (callback, ms, uniqueId) {
	    if (!uniqueId) {
	      uniqueId = "Don't call this twice without a uniqueId";
	    }
	    if (timers[uniqueId]) {
	      clearTimeout (timers[uniqueId]);
	    }
	    timers[uniqueId] = setTimeout(callback, ms);
	  };
	})();

	$(window).resize(function () {
	    waitForFinalEvent(function(){
	      	//call the resize of the areas
	      	newPictureWidth = document.getElementById("wordImage").offsetWidth;
		    newRatio = newPictureWidth/currentPictureWidth;
		    if(newRatio){
		    	// console.log(newRatio+"-");
		    	resizeAreas(newRatio);
		    	currentPictureWidth = newPictureWidth;
		    }
		    
		    
	    }, 700, "some unique string");
	});

    //reset the rects for the initial layout
    for (var i = list.length - 1; i >= 0; i--) {
    	var coordinates = list[i].getAttribute("coords").split(',');
		coordinates[0] = coordinates[0]-55;
		coordinates[1] = coordinates[1]-27;
		coordinates[2] = coordinates[2]-55;
		coordinates[3] = coordinates[3]-27;

		// coordinates[0] = coordinates[0]-110;
		// coordinates[1] = coordinates[1]-55;
		// coordinates[2] = coordinates[2]-110;
		// coordinates[3] = coordinates[3]-55;
		list[i].setAttribute("coords",coordinates.toString());
		// console.log(coordinates)

    }


}]);