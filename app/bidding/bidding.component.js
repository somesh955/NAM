(function(){
	'use-strict',

	angular.module('myApp.biddingCtrl',[])

	.controller('biddingController', ['$scope', 'AuthServ','MasterServ','BiddingServ','UtilsServ','LoggerServ','growl',function($scope, AuthServ, MasterServ, BiddingServ, UtilsServ, LoggerServ, growl){        

	     $scope.onInit = function(){
	     	$scope.stateList = AuthServ.userDetails().stateResponse;
	     };

	     $scope.getApmcList = function(stateId){
	     	MasterServ.getApmcList().save({"apmcRequest" :{"stateId": stateId}},function(response){
        		if(response.responseHeader.statusMsg === UtilsServ.responseType.EXECUTED){
                    LoggerServ.log(response);
                    $scope.ammcList = response.responseHeader;
        		}else{
                    LoggerServ.log(response);
        			growl.error(response.responseHeader.errMsg);
        		}        		
        	});
	     };

	     $scope.getCommodityList = function(apmcId){
	     	MasterServ.getCommodityList().save({"commodityRequest" :{"apmcId": apmcId}},function(response){
        		if(response.responseHeader.statusMsg === UtilsServ.responseType.EXECUTED){
                    LoggerServ.log(response);
                    $scope.commodityList = response.responseHeader;
        		}else{
                    LoggerServ.log(response);
        			growl.error(response.responseHeader.errMsg);
        		}        		
        	});
	     };

	     $scope.getCategoryList = function(apmcId){
	     	MasterServ.getCategoryList().save({"agentRequest" :{"apmcId": apmcId}},function(response){
        		if(response.responseHeader.statusMsg === UtilsServ.responseType.EXECUTED){
                    LoggerServ.log(response);
                    $scope.catList = response.responseHeader;
        		}else{
                    LoggerServ.log(response);
        			growl.error(response.responseHeader.errMsg);
        		}        		
        	});
	     };

	     $scope.onInit();
    }]);
})();