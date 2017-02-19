(function(){
	
	angular.module('myApp.authService',[])
	.factory('AuthServ',['$resource', '$http', 'AppConstant', 'StorageService',function($resource, $http, AppConstant, StorageService){
		var userInfo = {};
		return {
			'userDetails':function(){
				userInfo =StorageService.getUserDetails('userInfo');
				return userInfo;
			},
			'setUserDetails' : function(user){
				StorageService.setUserDetails('userInfo', user);
				userInfo = user;
			},
			'login': function(data,clb){
				return $http({
				    method: 'POST',
				    url: AppConstant.APP_URL+'/user/login',
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