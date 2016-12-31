(function(){
	'use-strict',

	angular.module('myApp.authCtrl',[])

	.controller('authController', function($scope, $rootScope,AuthServ, $state, UtilsServ, growl){
        $scope.login = function(){
        	AuthServ.login().get({"data":$scope.user},function(response){
        		if(response.status == UtilsServ.responseType.EXECUTED){
        			growl.success(response.message);
                    $rootScope.isLogin = true;
					AuthServ.setUserDetails(response.data[0]);
    				$state.go('dashboard');
        		}else{
        			growl.error(response.Message);
        		}        		
        	});
        };
    });
})();