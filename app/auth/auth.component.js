(function(){
    'use-strict',

    angular.module('myApp.authCtrl',[])

    .controller('authController',['$scope', '$rootScope', 'AuthServ', '$state', 'UtilsServ', 'growl', 'LoggerServ', '$translatePartialLoader', '$translate', 'AppConstant','$window' ,function($scope, $rootScope, AuthServ, $state, UtilsServ, growl, LoggerServ, $translatePartialLoader, $translate, AppConstant, $window){
        
        $rootScope.preferredLanguage = function(lang){
            $translate.use(lang+"-IN");
        }; 

        $translatePartialLoader.addPart('login');
        $translate.refresh();

        $scope.login = function(){
            $scope.user.apiKey = AppConstant.API_KEY;
            AuthServ.login().save({"loginRequest":$scope.user},function(response){
                if(response.responseHeader.statusMsg === UtilsServ.responseType.EXECUTED){
                    LoggerServ.log(response);
                    growl.success("User Login Successfully!!!");
                    $rootScope.isLogin = true;
                    AuthServ.setUserDetails(response.userDetails);
                    $window.location.href = '/#/dashboard';
                }else{
                    LoggerServ.log(response);
                    growl.error(response.responseHeader.errMsg);
                }               
            });
        };

        $scope.logout = function(){
            AuthServ.logout().save({},function(response){
                if(response.responseHeader.statusMsg === UtilsServ.responseType.EXECUTED){
                    LoggerServ.log(response);
                    growl.success("User logout Successfully!!!");
                    $rootScope.isLogin = false;
                    AuthServ.setUserDetails(null);
                    $state.go('home');
                }else{
                    LoggerServ.log(response);
                    growl.error(response.responseHeader.errMsg);
                } 
            });
        }
    }]);
})();