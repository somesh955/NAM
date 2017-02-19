(function(){
	
	angular.module('myApp.storageService',[])
	.factory('StorageService',['$localStorage',function($localStorage){

		var setUserDetails = function(key, value){
			$localStorage[key] = JSON.stringify(value);
		};

		var getUserDetails = function(key){
			var userInfo = $localStorage[key];
			return (null !== userInfo && undefined !== userInfo) ? JSON.parse(userInfo) : null;
		};

		return {
			'setUserDetails' : setUserDetails,
			'getUserDetails' : getUserDetails
		};
	}]);
})();