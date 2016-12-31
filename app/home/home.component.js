(function(){
	'use-strict',

	angular.module('myApp.homeCtrl',[])

	.controller('homeController', function($scope, BiddingServ){        

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
        	var requestData = 'orgId=1&oprId=49&refVal=2016050491330000024&userType=M';
        	BiddingServ.getDetailsUsingHttp(requestData, function(response){
				$scope.bidList = response.listNewBid;
	        });
        };

        $scope.postBid = function(obj, bidRate){
        	var data = {
        		  "bidType": obj.bidType,
				  "startDate": obj.startDate,
				  "endDate": obj.endDate,
				  "extendedDate": obj.extendedDate,
				  "auctionBidSubmission": {
				    "orgId": obj.orgId,
				    "oprId": obj.oprId,
				    "lotId": obj.lotId,
				    "traderId": obj.lotId,
				    "bidRate": bidRate,
				    "createdBy": new Date(),
				    "bidTranId": obj.tranId
				  }
				};
        	BiddingServ.doBid(data, function(response){
				console.log(response);
	        });
        };

        $scope.getBid = function(){
        	alert('Get Bid called');
        };

        $scope.onInIt();       
    });
})();