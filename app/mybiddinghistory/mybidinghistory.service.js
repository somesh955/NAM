/* (function(){
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
 */

(function(){
	
	angular.module('myApp.bidhistoryService',[])
	.factory('mybidhstServ',['$resource', '$http', 'AppConstant',function($resource, $http, AppConstant){
		return {
			'getmybidhst': function(data,clb){				
				return $http({
				    method: 'POST',
				    url: AppConstant.APP_URL+'/bidHistory/getBidHistory',
				    data: data,
				    headers: {'Content-Type': 'application/json'}
				}).success(function(response){
					clb(response) ;
				}).error(function(response){
					clb(response) ;
				});				
			}
			
		};
	}]);
})();
