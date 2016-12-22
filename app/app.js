 (function(){
 	'use-strict',

 	 angular.module('myApp', ['ngResource','ui.router','myApp.routes','myApp.homeCtrl','myApp.homeService','infinite-scroll','ngMaterial','md.data.table'])
 	 .constant('AppConstant',{
 	 		'APP_URL':"http://127.0.0.1:8080/NamWebSrv/rest/mobile",
 	 		"WEB_URL":"http://localhost:3000/",
 	 		"VERSION":"0.0.1"
 	 })
 	 .config(['$httpProvider','$mdThemingProvider',function($httpProvider, $mdThemingProvider){
 	 		$httpProvider.defaults.useXDomain = true;
 	 		delete $httpProvider.defaults.headers.common['X-Requested-With'];
 	 		$httpProvider.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

 	 		$mdThemingProvider.theme('default')
		    .primaryPalette('purple')
    		.accentPalette('green');

 	 }]);

 })();
 