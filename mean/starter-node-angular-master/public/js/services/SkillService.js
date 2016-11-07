angular.module('SkillsService', []).factory('Skills', ['$http', function($http) {

	return {
      getSkillInfo : function(skill) {
      	console.log("Called the skills"+skill);
      	return $http.get('/Skills/'+skill);
      }
   	}

}]);