(function(){
	
	angular.module('myApp.biddingService',[])
	.factory('BiddingServ',function($resource, $http, $httpParamSerializer, AppConstant){
		var bidColumnList = [{//Define the Table content
	      	name: "oprName", //The identifier name
	      	display: "APMC" //the name that will be displayed
	    }
		,  { //Add as many columns as you need
		      name: "productName",
		      display: "Commodity"
		}
		,  { //Add as many columns as you need
		      name: "lotCode",
		      display: "Lot Code"
		}
		,  { //Add as many columns as you need
		      name: "commissionAgent",
		      display: "Agent"
		}
		,  { //Add as many columns as you need
		      name: "wbWeight",
		      display: "No of Bags"
		}
		,  { //Add as many columns as you need
		      name: "wbWeight",
		      display: "Commodity UOM Qty"
		}
		,  { //Add as many columns as you need
		      name: "0",
		      display: "Min Bid"
		}
		,  { //Add as many columns as you need
		      name: "0",
		      display: "Last Bid"
		}
		,  { //Add as many columns as you need
		      name: "0",
		      display: "My Bid"
		}
		,  { //Add as many columns as you need
		      name: "timeRemain",
		      display: "Time Remain"
		}
		,  { //Add as many columns as you need
		      name: "",
		      display: "New Bid"
		}
		,  { //Add as many columns as you need
		      name: "",
		      display: "Bid"
		}
		,  { //Add as many columns as you need
		      name: "",
		      display: "Certificate"
		}
		,  { //Add as many columns as you need
		      name: "seller",
		      display: "Seller"
		}
		,  { //Add as many columns as you need
		      name: "",
		      display: "Village"
		}
		,  { //Add as many columns as you need
		      name: "",
		      display: "Test Results"
		}
		,  { //Add as many columns as you need
		      name: "startDate",
		      display: "Start Date"
		}
		,  { //Add as many columns as you need
		      name: "endDate",
		      display: "End Date"
		}
		,  { //Add as many columns as you need
		      name: "submitMultiBid",
		      display: "Re-Bid Allowed"
		}
		,  { //Add as many columns as you need
		      name: "extendedEndTime",
		      display: "Extended Date"
		}];



		return {
			"getDetails": function(){
				return $resource(AppConstant.WEB_URL+'/resources/data/biddingDetails.json');				

			},
			"getDetailsUsingHttp":function(data, clb){				
				return $http({
				    method: 'POST',
				    url: AppConstant.APP_URL+'/bidding/getNewBid',
				    data: $httpParamSerializer(data),
				    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).success(function(response){
					clb(response) ;
				}).error(function(response){
					clb(response) ;
				});
			},
			"doBid" : function(data,clb){
				return $http({
				    method: 'POST',
				    url: AppConstant.APP_URL+'/bidding/auctionBidSubmission',
				    data: $httpParamSerializer(data),
				    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).success(function(response){
					clb(response) ;
				}).error(function(response){
					clb(response) ;
				});
			},
			"getColumnList" : function(){
				return bidColumnList;
			}
		}

	});

})();