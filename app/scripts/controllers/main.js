"use strict"

/**
 * @ngdoc function
 * @name websiteApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the websiteApp
 */
myApp.controller('MainCtrl',['$scope','SkillService', '$location','$anchorScroll','$document', '$window', function ($scope, SkillsService, $location, $anchorScroll, $document, $window) {

		var someElement = angular.element(document.getElementById("profile"));
    	$document.scrollTo(someElement.prop('offsetLeft'), someElement.prop('offsetTop'), 0); 

var backColor="blue";	
	angular.element($window).bind("scroll", function() {
             if($window.innerHeight*0.45<$window.scrollY){
			  	$scope.upperSection=false;
			  	console.log("passed")
			  	$scope.arrowSkills = {'visibility': 'hidden'}; 
			  	$scope.arrowProfile = {'visibility': 'visible'}; // then button will visible.

			  }else{
			  	$scope.upperSection=true;
			  	$scope.arrowProfile = {'visibility': 'hidden'}; 
			  	$scope.arrowSkills = {'visibility': 'visible'}; // then button will visible.
			  }
        });


    $scope.getSkill  = function(skill){
    	$scope.skill = skill;
    	// console.log(skill)

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
		console.log(skill);
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
	    SkillsService.getJSONSkills().success(function(data) {
			    $scope.skills = data;
			});;
	    
	  });

    var list = document.getElementsByTagName("area");
    	
	var waitForFinalEvent = (function () {
	  var timers = {};
	  return function (callback, ms, uniqueId) {
	    if (!uniqueId) {
	      uniqueId = "Don't call this twice without a uniqueId";
	      console.log(uniqueId);
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

		    $location.hash("profile");
		    $scope.moveTo("profile"); 
		    
	    }, 200, "some unique string");
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
    $scope.gotoAnchor = function(x) {
      var newHash = x;
      if ($location.hash() !== newHash) {
        // set the $location.hash to `newHash` and
        // $anchorScroll will automatically scroll to it
        $location.hash(x);
      } else {
        // call $anchorScroll() explicitly,
        // since $location.hash hasn't changed
        $anchorScroll();
      }
    };

    $scope.moveTo = function (destination){
    	console.log("Go to "+destination);
    	$(".body").css("background-color", "yellow");
    	var choice = Math.floor(Math.random()*4);

        if(choice == 0){
          $('html, body').removeClass(backColor).addClass("green");
          backColor = "green";
        }else if(choice == 1){
          $('html, body').removeClass(backColor).addClass("red");
          backColor = "red";
        }else if(choice == 2){
          $('html, body').removeClass(backColor).addClass("blue");
          backColor = "blue";
        }else if(choice == 3){
          $('html, body').removeClass(backColor).addClass("orange");
          backColor = "orange";
        }

    	
    	var someElement = angular.element(document.getElementById(destination));
    	
    	profile
    	console.log(someElement)
    	var top = someElement.prop('offsetTop');
    	if(destination==="profile"){top = 0;}
    	$document.scrollTo(someElement.prop('offsetLeft'), top, 500); 	 
    	
    }
    $scope.changeBackgroundColor = function(){
    	
    }

  }]);
