(function(){
	'use-strict',

	angular.module('myApp.authCtrl',[])

	.controller('authController', function($scope, $rootScope,AuthServ, $state, UtilsServ, growl, LoggerServ){
        $scope.login = function(){
        	AuthServ.login({"verifyUserRequest":$scope.user},function(response){
        		if(response.statusMsg === UtilsServ.responseType.EXECUTED){
                    LoggerServ.log(response);
        			growl.success("User Login Successfully!!!");
                    $rootScope.isLogin = true;
					AuthServ.setUserDetails(response.responseHeader[0]);
    				$state.go('dashboard');
        		}else{
                    LoggerServ.log(response);
        			growl.error(response.errMsg);
        		}        		
        	});
        };
    });
})();