(function(){
	
	angular.module('myApp.authService',[])
	.factory('AuthServ',function($resource){
		var userInfo = {};
		return {
			'userDetails':function(){
				return userInfo;
			},
			'setUserDetails' : function(user){
				userInfo = user;
			},
			'login': function(){
				return $resource('http://localhost:3000/resources/data/login.json',{},{specialAction: {method: 'GET'}});				
			}
		};
	});
})();