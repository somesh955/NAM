(function(){
	'use-strict',

	angular.module('myApp.homeCtrl',[])

	.controller('homeController', function($scope, BiddingServ, AuthServ, UtilsServ, growl, LoggerServ){        

		$scope.onInIt = function(){	
			$scope.autocolumn = BiddingServ.getColumnList();
			$scope.limitOptions = [5, 10, 15]; //How many entries per page options
			$scope.options = {
			   pageSelect: true //Yes we want a page selection
			};
			$scope.query = { //Define the query
			   order: 'oprName', //What should be the initial sorting
			   limit: 10, //How many entries per page
			   page: 1 //What is the starting page
			};
			$scope.getDetails();		 
		};

        $scope.getDetails = function(){
			var user = AuthServ.userDetails()
			var requestData = {};
			requestData.orgId = user.orgId;
			requestData.oprId = user.oprId;
			requestData.refVal = user.refVal;
			requestData.userType = user.userType;
        	BiddingServ.getDetailsUsingHttp({"getNewBid":requestData}, function(response){
        		if(response.statusMsg === UtilsServ.responseType.EXECUTED){
					LoggerServ.log(response);
					growl.success("Bid list retrive successfully !!!");
					$scope.bidList = response.listNewBid;
				}else{
					LoggerServ.log(response);
					growl.error(response.errMsg);

				}
	        });
        };

        $scope.postBid = function(obj, bidRate){
        	var bidData = {};
    		bidData.bidType = obj.bidType;
			bidData.startDate = obj.startDate;
			bidData.endDate = obj.endDate;
			bidData.extendedDate = obj.extendedDate;
			bidData.orgId = obj.orgId;
			bidData.oprId = obj.oprId;
			bidData.lotId = obj.lotId;
			bidData.traderId = obj.lotId;
			bidData.bidRate = bidRate;
			bidData.createdBy = new Date();
			bidData.bidTranId = obj.tranId;				 
				
        	BiddingServ.doBid({"auctionBidSubmission":bidData}, function(response){
        		if(response.statusMsg === UtilsServ.responseType.EXECUTED){
					LoggerServ.log(response);
					growl.success("Bid quated successfully !!!");
				}else{
					LoggerServ.log(response);
					growl.error(response.errMsg);
				}
	        });
        };

        $scope.getBid = function(){
        	alert('Get Bid called');
        };

        $scope.onInIt();       
    });
})();