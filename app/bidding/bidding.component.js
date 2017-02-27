(function(){
	'use-strict',

	angular.module('myApp.biddingCtrl',[])

	.controller('biddingController', ['$scope', '$rootScope','AuthServ','MasterServ','BiddingServ','UtilsServ','LoggerServ','growl','Spinner',function($scope,$rootScope, AuthServ, MasterServ, BiddingServ, UtilsServ, LoggerServ, growl, Spinner){        

	     $scope.onInit = function(){
		 if((AuthServ.userDetails().userType) === "G"){		 
	     	 $scope.stateList = AuthServ.userDetails().stateResponse;
		 }else if((AuthServ.userDetails().userType) === "S"){
			$scope.stateList = AuthServ.userDetails().stateResponse;
			 $scope.state=AuthServ.userDetails().stateResponse[0].stateId;			 
			 $scope.getApmcList($scope.state);
		  }else{
			 $scope.stateList = AuthServ.userDetails().stateResponse;
			 $scope.state=AuthServ.userDetails().stateResponse[0].stateId;
			 $scope.getApmcList($scope.state);
		  }		 
	     };
				 
	     $scope.getApmcList = function(stateId){
	     	Spinner.startSpin();
	     	MasterServ.getApmcList().save({"apmcRequest" :{"stateId": stateId}},function(response){
        		if(response.responseHeader.statusMsg === UtilsServ.responseType.EXECUTED){
                    LoggerServ.log(response);
                    $scope.ammcList = response.apmcDetails;
                    Spinner.stopSpin();
        		}else{
                    LoggerServ.log(response);
        			growl.error(response.responseHeader.errMsg);
        			Spinner.stopSpin();
        		}        		
        	});
	     };

	     $scope.getList = function(apmcId){	
	     Spinner.startSpin();		 
	     	MasterServ.getCommodityList().save({"commodityRequest" :{"apmcId": apmcId}},function(response){
        		if(response.responseHeader.statusMsg === UtilsServ.responseType.EXECUTED){
                    LoggerServ.log(response);					
                    $scope.commodityList = response.commodityDetails;
                    Spinner.stopSpin();
        		}else{
                    LoggerServ.log(response);
        			growl.error(response.responseHeader.errMsg);
        			Spinner.stopSpin();
        		}        		
        	});
			MasterServ.getCAList().save({"agentRequest" :{"apmcId": apmcId}},function(response){
        		if(response.responseHeader.statusMsg === UtilsServ.responseType.EXECUTED){
                    LoggerServ.log(response);
                    $scope.catList = response.caDetails;
                    Spinner.stopSpin();
        		}else{
                    LoggerServ.log(response);
        			growl.error(response.responseHeader.errMsg);
        			Spinner.stopSpin();
        		}        		
        	});
	     };
		 
			$scope.getbidGridList=function(bid){
				Spinner.startSpin();
				$rootScope.bid=bid;
				BiddingServ.getBidList().save({"newBidRequest" :{"txnOprId": bid.apmc,"caId": bid.agent,"commodityId": bid.commodity}},function(response){
				if(response.responseHeader.statusMsg === UtilsServ.responseType.EXECUTED){
                    LoggerServ.log(response);
                    $scope.bidingGrid = response.newBids;
                    Spinner.stopSpin();
        		}else{
                    LoggerServ.log(response);
        			growl.error(response.responseHeader.errMsg);
        			Spinner.stopSpin();
        		}        		
        	});			
		 };
		 	 
		 
		 $scope.bidSubmission=function(bidValue){		
		 		Spinner.startSpin();	 
				BiddingServ.bidSubmission().save({"bidSubmitRequest" :bidValue},function(response){
				if(response.responseHeader.statusMsg === UtilsServ.responseType.EXECUTED){
                    LoggerServ.log(response);
                    $scope.bidingGrid = response.bidSubmitResponse;
					$scope.getbidGridList($rootScope.bid);
					Spinner.stopSpin();
        		}else{
                    LoggerServ.log(response);
        			growl.error(response.responseHeader.errMsg);
        			Spinner.stopSpin();
        		}        		
        	});			
		 };
	     $scope.onInit();
    }]);
})();