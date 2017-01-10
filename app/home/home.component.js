(function(){
	'use-strict',

	angular.module('myApp.homeCtrl',[])

	.controller('homeController', function($scope, BiddingServ, AuthServ, UtilsServ, growl, LoggerServ, AppConstant){        

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
			var user = AuthServ.userDetails();
			var requestData = {};
			requestData.orgId = user.orgId;
			requestData.oprId = user.oprId;
			requestData.refVal = user.refVal;
			requestData.userType = user.userType;
        	BiddingServ.getDetailsUsingHttp({"getNewBid":requestData}, function(response){
        		if(response.statusMsg === UtilsServ.responseType.EXECUTED){
					LoggerServ.log(response);
					growl.success("Bid list retrive successfully !!!");
					$scope.bidList = response.responseHeader;
				}else{
					LoggerServ.log(response);
					growl.error(response.errMsg);

				}
	        });
        };

        $scope.postBid = function(obj, bidRate){
        	var refVal = AuthServ.userDetails().refVal;
        	var userId = AuthServ.userDetails().userId;
        	var bidData = {};
    		bidData.bidType = obj.bidType;
			bidData.startDate = UtilsServ.dateFormat(obj.startDate, AppConstant.CLIENT_DATEFORMAT);
			bidData.endDate = UtilsServ.dateFormat(obj.endDate, AppConstant.CLIENT_DATEFORMAT);
			bidData.extendedDate = UtilsServ.dateFormat(obj.extendedEndTime, AppConstant.CLIENT_DATEFORMAT);
			bidData.orgId = obj.orgId;
			bidData.oprId = obj.oprId;
			bidData.lotId = obj.lotId;
			bidData.traderId = refVal;
			bidData.bidRate = bidRate;
			bidData.createdBy = userId;
			bidData.bidTranId = obj.bidTranId;				 
				
        	BiddingServ.doBid({"auctionBidSubmission":bidData}, function(response){
        		if(response.statusMsg === UtilsServ.responseType.EXECUTED){
					LoggerServ.log(response);
					growl.success("Bid successfully !!!");
					$scope.getDetails();
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