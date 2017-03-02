(function(){
	'use-strict',

	angular.module('myApp.biddingCtrl',[])

	.controller('biddingController', ['$scope', '$rootScope','AuthServ','MasterServ','BiddingServ','UtilsServ','LoggerServ','growl','Spinner','$uibModal', function($scope,$rootScope, AuthServ, MasterServ, BiddingServ, UtilsServ, LoggerServ, growl, Spinner, $uibModal){        

	     $scope.onInit = function(){
            $scope.bidList = [];
            $scope.succesList = [];

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
		 
        $scope.dateDifference = function(endDate){
            return UtilsServ.getDateDifference(new Date(), endDate);
        } 

	    $scope.getbidGridList=function(bid){
			Spinner.startSpin();
			$rootScope.bid=bid;
			BiddingServ.getBidList().save({"newBidRequest" :bid},function(response){
    			if(response.responseHeader.statusMsg === UtilsServ.responseType.EXECUTED){
                    LoggerServ.log(response);
                    $scope.bidingGrid = response.newBids;
                    $scope.bidList = [];
                    Spinner.stopSpin();
        		}else{
                    LoggerServ.log(response);
        			growl.error(response.responseHeader.errMsg);
        			Spinner.stopSpin();
        		}        		
        	});			
		 };
		 	 
	
		 $scope.bidSubmission=function(bidList){	
		 		Spinner.startSpin();	 
				BiddingServ.bidSubmission().save({"bidSubmitRequest" :bidList},function(response){
				if(response.responseHeader.statusMsg === UtilsServ.responseType.EXECUTED){
                    LoggerServ.log(response);
                    $scope.bidingGrid = response.bidSubmitResponse;
					$scope.getbidGridList($rootScope.bid);
                    $scope.open('md','SuccessContent.html');
                    $scope.succesList = response.bidSubmitResponse;
					Spinner.stopSpin();
        		}else{
                    LoggerServ.log(response);
        			growl.error(response.responseHeader.errMsg);
        			Spinner.stopSpin();
        		}        		
        	});			
		 };

        $scope.postMultiBid = function(bidObj){
            if ($scope.bidList.indexOf(bidObj) !== -1) {
                $scope.bidList.pop(bidObj);    
            }
            $scope.bidList.push(bidObj);
        };

        $scope.open = function (size, template) {

            var modalInstance = $uibModal.open({
              animation: $scope.animationsEnabled,
              templateUrl: template,
              controller: 'ModalInstanceCtrl',
              size: size,
              resolve: {
                bidList: function () {
                  return $scope.bidList;
                },
                succesList : function(){
                    return $scope.succesList;
                }
              }              
            });

            modalInstance.result.then(function (bidList) {
              LoggerServ.info(bidList);  
              $scope.bidSubmission(bidList);
            }, function () {
              LoggerServ.info('Modal dismissed at: ' + new Date());
            });
        };

	     $scope.onInit();
    }])
    .controller('ModalInstanceCtrl',['$scope', '$uibModalInstance','bidList','succesList',function ($scope, $uibModalInstance,bidList, succesList) {
          
          $scope.bidList = [];
          $scope.succesList = [];
          
          $scope.bidList = bidList;
          $scope.succesList = succesList;

          $scope.save = function () {
            $uibModalInstance.close($scope.bidList);
          };

          $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
          };
    }]);
})();
