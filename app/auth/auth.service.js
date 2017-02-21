(function(){
	'use-strict';
	angular.module('myApp.authService',[])
	.factory('AuthServ',['$resource', 'AppConstant', 'StorageService',function($resource, AppConstant, StorageService){
		var userInfo = {};
		var UserDetails = function(){
			userInfo =StorageService.getUserDetails('userInfo');
			return userInfo;
		};
		var SaveUserDetails = function(){
			userInfo =StorageService.getUserDetails('userInfo');
			return userInfo;
		};
		var Login = function(){
			return $resource(AppConstant.APP_URL+'/user/login/');
		};
		var Logout = function(){
			return $resource(AppConstant.APP_URL+'/user/logout');
		};
		
		return {
			'userDetails': UserDetails,
			'setUserDetails' : SaveUserDetails,
			'login': Login,
			'logout': Logout
		};
	}]);
})();
