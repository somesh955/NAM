(function(){
	'use-strict',

	angular.module('myApp.homeCtrl',[])

	.controller('homeController', function($scope, BiddingServ){
        var data = 'orgId=1&oprId=49&refVal=2016050491330000024&userType=M';

        $scope.getDetails = function(){
        	BiddingServ.getDetailsUsingHttp(data, function(response){
				$scope.data = response.listNewBid;
	        });

        };

         $scope.getDetails();

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
       
    });
})();