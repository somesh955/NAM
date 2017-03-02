(function(){
 	'use-strict',

angular.module('myApp', ['ngResource','pascalprecht.translate','ngSanitize','ui.router','myApp.routes','myApp.loggerService',
	'myApp.authCtrl','myApp.authService',
	'myApp.utilService','infinite-scroll',
	'angular-growl', 'ngAnimate','myApp.menuService',
	'ngStorage', 'myApp.storageService','ng.deviceDetector', 'myApp.requestService',
	'myApp.homeCtrl','myApp.homeService',
	'myApp.dashboardCtrl','myApp.dashboardService',
	'myApp.biddingCtrl','myApp.biddingService',
	'angularSpinner','myApp.SpinnerService','ui.bootstrap',
	'myApp.bidhistoryCtrl','myApp.bidhistoryService'
	])
.constant('AppConstant',{
 	 		"APP_URL":"http://45.118.182.35:7080/NamWebService/1.0",
			//"APP_URL":"http://192.168.0.99:8080/NamWebService/1.0",
 	 		"WEB_URL":"http://localhost:3000/",
 	 		"VERSION":"1.0",
 	 		"CLIENT_DATEFORMAT" : "dd/MM/yyyy HH:mm",
 	 		"SERVER_DATEFORMAT" : "yyyy-MM-dd'T'HH:mm:ss'Z'Z",
 	 		"DEV_MODE": true ,
 	 		"API_KEY" : "123456789"
 	 })
 	 .config(['$httpProvider','growlProvider','$translateProvider', '$translatePartialLoaderProvider','AppConstant', function($httpProvider, growlProvider, $translateProvider, $translatePartialLoaderProvider, AppConstant){
 	 		$httpProvider.interceptors.push('httpInjector');
 	 		$httpProvider.defaults.useXDomain = true;
 	 		delete $httpProvider.defaults.headers.common['X-Requested-With'];
 	 		$httpProvider.defaults.headers.common['Content-Type'] = 'application/json';

 	 		growlProvider.globalTimeToLive({success: 2000, error: 3000, warning: 4000, info: 5000});
   		    
   		    $translateProvider.useLoader('$translatePartialLoader', {
		      urlTemplate: AppConstant.WEB_URL+'resources/translations/{lang}/{part}.json'
		    });
   		    $translateProvider.useSanitizeValueStrategy('sanitize');
			$translateProvider.preferredLanguage('en-IN');

 	 }])
 	 .factory('httpInjector', ['CommonRequestServ','AppConstant','UtilsServ', 'StorageService',function(CommonRequestServ, AppConstant, UtilsServ, StorageService) {  
 	 	var deviceInfo = CommonRequestServ.getdeviceInfomation();
 	 	var userInfo = StorageService.getUserDetails('userInfo');
 	 	var KeySign = (UtilsServ.isUndefinedOrNull(userInfo)) ? "" : UtilsServ.getEncryptedKS(UtilsServ.getKeySign(userInfo.userId,"01",UtilsServ.setDateFormat().toString()),userInfo.secureToken);
 	 	var timestamp = new Date().getTime();

        var httpInjector = {
            request: function(config) {
            	if(config.data !==null && config.data !== undefined){
	            	var commonHeader = {
						    "version": "1.0",
						    "ts": UtilsServ.setDateFormat().toString(),
						    "txn": new Date().getUTCMilliseconds(),
						    "keySign": KeySign,
						    "keyIndex": "",
						    "sessionRefId": (UtilsServ.isUndefinedOrNull(userInfo))  ? "" : userInfo.sessionRefId,
						    "lang": "en",
						    "deviceInfo": {
						      "os": deviceInfo.os,
						      "osVersion": deviceInfo.os_version,
						      "deviceType": (deviceInfo.device === "unknown") ? "B" : deviceInfo.device,
						      "deviceId": "",
						      "publicIp": "192.168.0.99",
						      "browser": deviceInfo.browser+' '+deviceInfo.os_version,
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
 	 .run(['AuthServ','UtilsServ','$state','$rootScope','MenuService','$timeout','LoggerServ','growl' ,function(AuthServ, UtilsServ, $state, $rootScope, MenuService, $timeout, LoggerServ, growl){
		
		(function(){
			$rootScope.isLogin = false;
			$rootScope.menus = MenuService.getParentMenu();
	    	$rootScope.childMenus = MenuService.getChildMenu();
	    	var runClock = function(){
	 	 		$rootScope.clock = "loading clock..."; // initialise the time variable
			    var tick = function() {
			        $rootScope.clock = Date.now() // get the current time
			        $timeout(tick, 1000); // reset the timer
			    }
			    // Start the timer
			    tick();
	 	 	};
	 	 	if (AuthServ.isAuthenticated()) {
	        	$rootScope.isLogin = true;
	        	var userInfo = AuthServ.userDetails();
		    	$rootScope.userInfo = userInfo;
	        	runClock();
	        	$timeout(function(){$state.go("dashboard")});
	            return ;
	        }else{
	        	$rootScope.isLogin = false;
	        	$rootScope.userInfo = null;
	        	$timeout(function(){$state.go("login")});
	        	return ;
	        }		    
		})();
	}]);
 })();