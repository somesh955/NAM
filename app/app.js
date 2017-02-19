 (function(){
 	'use-strict',

angular.module('myApp', ['ngResource','pascalprecht.translate','ngSanitize','ui.router','myApp.routes','myApp.loggerService','myApp.authCtrl','myApp.authService','myApp.utilService','myApp.homeCtrl','myApp.homeService','infinite-scroll','ngMaterial','md.data.table','angular-growl', 'ngAnimate','myApp.dashboardCtrl','myApp.dashboardService','myApp.menuService','ngStorage', 'myApp.storageService','ng.deviceDetector', 'myApp.requestService','myApp.biddingCtrl','myApp.biddingService'])
.constant('AppConstant',{
 	 		/*"APP_URL":"http://182.18.139.136/NamWebService/1.0",*/
			"APP_URL":"http://192.168.1.235/NamWebService/1.0",
 	 		"WEB_URL":"http://localhost:3000/",
 	 		"VERSION":"1.0",
 	 		"CLIENT_DATEFORMAT" : "dd/MM/yyyy HH:mm:ss",
 	 		"SERVER_DATEFORMAT" : "yyyy-MM-dd'T'hh:mm'Z'Z",
 	 		"DEV_MODE": true 
 	 })
 	 .config(['$httpProvider','$mdThemingProvider','growlProvider','$translateProvider', '$translatePartialLoaderProvider','AppConstant', function($httpProvider, $mdThemingProvider, growlProvider, $translateProvider, $translatePartialLoaderProvider, AppConstant){
 	 		$httpProvider.interceptors.push('httpInjector');
 	 		$httpProvider.defaults.useXDomain = true;
 	 		delete $httpProvider.defaults.headers.common['X-Requested-With'];
 	 		$httpProvider.defaults.headers.common['Content-Type'] = 'application/json';

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
 	 .factory('httpInjector', ['CommonRequestServ','AppConstant','UtilsServ', function(CommonRequestServ, AppConstant, UtilsServ) {  
 	 	var deviceInfo = CommonRequestServ.getdeviceInfomation();
        var httpInjector = {
            request: function(config) {
            	if(config.data !==null && config.data !== undefined){
	            	var commonHeader = {
						    "version": "1.0",
						    "ts": UtilsServ.setDateFormat().toString(),
						    "txn": new Date().getUTCMilliseconds(),
						    "keySign": "",
						    "keyIndex": "",
						    "sessionRefId": "",
						    "lang": "en",
						    "deviceInfo": {
						      "os": deviceInfo.os,
						      "osVersion": deviceInfo.os_version,
						      "deviceType": (deviceInfo.device === "unknown") ? "B" : deviceInfo.device,
						      "deviceId": "",
						      "publicIp": "192.168.0.99",
						      "browser": deviceInfo.raw.userAgent,
						      "appVersion" : AppConstant.VERSION
						    }
						  }	
					config.data.requestHeader = commonHeader;	
            	}	 
                return config;
            }
        };
        return httpInjector;
    }])
 	 .run(['AuthServ','UtilsServ','$state','$rootScope','MenuService','$timeout' ,function(AuthServ, UtilsServ, $state, $rootScope, MenuService, $timeout){
 	 	$rootScope.isLogin = false;
 	 	$rootScope.menus = MenuService.getParentMenu();
	    $rootScope.childMenus = MenuService.getChildMenu();
	    var userInfo = AuthServ.userDetails();

 	 	if(!UtilsServ.isUndefinedOrNull(userInfo) && UtilsServ.isSessionExpire(userInfo.sessionExpiryTime)){
 	 			$rootScope.isLogin = true;
 	 			$state.go('dashboard');
 	 			return true;
 	 	}else{
 	 		$timeout(function() {
		        $state.go('login');
		    });
 	 		return true;
 	 	} 	 	
 	 }]);
 })();
 