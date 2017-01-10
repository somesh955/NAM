 (function(){
 	'use-strict',

 	 angular.module('myApp', ['ngResource','pascalprecht.translate','ngSanitize','ui.router','myApp.routes','myApp.loggerService','myApp.authCtrl','myApp.authService','myApp.utilService','myApp.homeCtrl','myApp.homeService','infinite-scroll','ngMaterial','md.data.table','angular-growl', 'ngAnimate'])
 	 .constant('AppConstant',{
 	 		"APP_URL":"http://182.18.139.136/NamWebService/1.0",
 	 		"WEB_URL":"http://localhost:3000/",
 	 		"VERSION":"0.0.1",
 	 		"CLIENT_DATEFORMAT" : "dd/MM/yyyy HH:mm:ss",
 	 		"DEV_MODE": true 
 	 })
 	 .config(['$httpProvider','$mdThemingProvider','growlProvider','$translateProvider', '$translatePartialLoaderProvider','AppConstant', function($httpProvider, $mdThemingProvider, growlProvider, $translateProvider, $translatePartialLoaderProvider, AppConstant){
 	 		$httpProvider.defaults.useXDomain = true;
 	 		delete $httpProvider.defaults.headers.common['X-Requested-With'];
 	 		$httpProvider.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

 	 		$mdThemingProvider.theme('default')
		    .primaryPalette('purple')
    		.accentPalette('green');

    		growlProvider.globalTimeToLive({success: 2000, error: 3000, warning: 4000, info: 5000});
   		    
   		    $translateProvider.useLoader('$translatePartialLoader', {
		      urlTemplate: AppConstant.WEB_URL+'resources/translations/{lang}/{part}.json'
		    });
   		    $translateProvider.useSanitizeValueStrategy('sanitize');
			$translateProvider.preferredLanguage('en-IN');
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
 