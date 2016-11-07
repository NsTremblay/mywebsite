angular.module('skillsService', [])

.factory('SkillService', ['$http', function($http){
    return {
      	getJSONSkills: function(){
      		return $http.get('/scripts/skills.json');
      	}
   	}
}]);