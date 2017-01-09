(function(){
	
	angular.module('myApp.authService',[])
	.factory('AuthServ',function($resource, $http, $httpParamSerializer, AppConstant){
		var userInfo = {};
		return {
			'userDetails':function(){
				return userInfo;
			},
			'setUserDetails' : function(user){
				userInfo = user;
			},
			'login': function(data,clb){
				return $http({
				    method: 'POST',
				    url: AppConstant.APP_URL+'/user/login',
				    data: $httpParamSerializer(data),
				    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).success(function(response){
					clb(response) ;
				}).error(function(response){
					clb(response) ;
				});				
			}
		};
	});
})();