(function(){
	
	angular.module('myApp.storageService',[])
	.factory('StorageService',['$localStorage',function($localStorage){

		var setUserDetails = function(key, value){
			$localStorage.$default({key : value});
		};

		var getUserDetails = function(key){
			return $localStorage.$default[key];
		};

		return {
			'setUserDetails' : setUserDetails,
			'getUserDetails' : getUserDetails
		};
	}]);
})();