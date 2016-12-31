 (function(){
 	'use-strict',

 	 angular.module('myApp', ['ngResource','ui.router','myApp.routes','myApp.authCtrl','myApp.authService','myApp.utilService','myApp.homeCtrl','myApp.homeService','infinite-scroll','ngMaterial','md.data.table','angular-growl', 'ngAnimate'])
 	 .constant('AppConstant',{
 	 		"APP_URL":"http://192.168.0.85:8080/NamWebSrv/rest/mobile",
 	 		"WEB_URL":"http://localhost:3000/",
 	 		"VERSION":"0.0.1"
 	 })
 	 .config(['$httpProvider','$mdThemingProvider','growlProvider',function($httpProvider, $mdThemingProvider, growlProvider){
 	 		$httpProvider.defaults.useXDomain = true;
 	 		delete $httpProvider.defaults.headers.common['X-Requested-With'];
 	 		$httpProvider.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

 	 		$mdThemingProvider.theme('default')
		    .primaryPalette('purple')
    		.accentPalette('green');

    		growlProvider.globalTimeToLive({success: 2000, error: 3000, warning: 4000, info: 5000});

 	 }])
 	 .run(['AuthServ','UtilsServ','$state','$rootScope' ,function(AuthServ, UtilsServ, $state, $rootScope){
 	 	$rootScope.isLogin = false;
 	 	if(UtilsServ.isUndefiedOrNull(AuthServ.userDetails())){
 	 		if(AuthServ.userDetails().expire_time > 0){
 	 			$rootScope.isLogin = true;
 	 			$state.go('dashboard');
 	 			return;
 	 		}
 	 	}
 	 	$state.go('login');
 	 	return;
 	 }]);
 })();
 