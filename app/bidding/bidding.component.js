(function(){
	'use-strict',

	angular.module('myApp.biddingCtrl',[])

	.controller('biddingController', ['$scope', 'AuthServ','MasterServ','BiddingServ','UtilsServ','LoggerServ','growl','Spinner',function($scope, AuthServ, MasterServ, BiddingServ, UtilsServ, LoggerServ, growl, Spinner){        

		$scope.onInit = function(){
			$scope.getbidGridList();
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

		$scope.getApmcList = function(state){
			Spinner.startSpin();
			MasterServ.getApmcList().save({"apmcRequest" :{"stateId": state}},function(response){	     		
				if(response.responseHeader.statusMsg === UtilsServ.responseType.EXECUTED){
					LoggerServ.log(response);
					$scope.apmcList = response.apmcDetails;
					Spinner.stopSpin();
				}else{
					LoggerServ.log(response);
					growl.error(response.responseHeader.errMsg);
					Spinner.stopSpin();
				}        		
			});
		};

		$scope.getCommodityList = function(apmcId){
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
		};

		$scope.getAgentList = function(apmcId){
			Spinner.startSpin();
			MasterServ.getAgentList().save({"agentRequest" :{"apmcId": apmcId}},function(response){
				if(response.responseHeader.statusMsg === UtilsServ.responseType.EXECUTED){
					LoggerServ.log(response);
					$scope.agentList = response.caDetails;
					Spinner.stopSpin();
				}else{
					LoggerServ.log(response);
					growl.error(response.responseHeader.errMsg);
					Spinner.stopSpin();
				}        		
			});
		};

		$scope.getbidGridList=function(){			
			Spinner.startSpin();
			BiddingServ.getBidTableColumnList().get({},function(response){
				if(response.responseHeader.statusMsg === UtilsServ.responseType.EXECUTED){
					LoggerServ.log(response);
					$scope.autocolumn = response.bidColumnList;
					Spinner.stopSpin();
				}else{
					LoggerServ.log(response);
					growl.error(response.responseHeader.errMsg);
					Spinner.stopSpin();
				}        		
			});			
		};

		$scope.getbidList=function(bidModel){
			BiddingServ.setBidSearch(bidModel);
			Spinner.startSpin();
			BiddingServ.getBidList().get({"newBidRequest" :bidModel},function(response){
				if(response.responseHeader.statusMsg === UtilsServ.responseType.EXECUTED){
					LoggerServ.log(response);
					$scope.bidingGrid = response.bidingGrid;
					Spinner.stopSpin();
				}else{
					LoggerServ.log(response);
					growl.error(response.responseHeader.errMsg);
					Spinner.stopSpin();
				}        		
			});			
		};

		$scope.bidSubmission=function(bidModel){	
			Spinner.startSpin();		 
			BiddingServ.bidSubmit().save({"bidSubmitRequest" : bidModel},function(response){
				if(response.responseHeader.statusMsg === UtilsServ.responseType.EXECUTED){
					LoggerServ.log(response);
					$scope.bidingGrid = response.bidSubmitResponse;
					$scope.getbidGridList(BiddingServ.getBidSearch);
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