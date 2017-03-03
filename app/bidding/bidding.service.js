(function(){
	
	angular.module('myApp.biddingService',[])
	.factory('MasterServ',function($resource, AppConstant){

		var ApmcList = function(){
			return $resource(AppConstant.APP_URL+'/masters/getApmc'); 
		};
		var CommodityList = function(){
			return $resource(AppConstant.APP_URL+'/masters/getCommodity'); 
		};
		var CommisionAgentList = function(){
			return $resource(AppConstant.APP_URL+'/masters/getCa'); 
		};

		return {
			"getApmcList" : ApmcList,
			"getCommodityList" : CommodityList,
			"getCAList" : CommisionAgentList,
		};

	})
	.factory('BiddingServ',function($resource, AppConstant){
		var BidList = function(){
			return $resource(AppConstant.APP_URL+'/bidding/getNewBid');     
		};
		var NewBid = function(){
			return $resource(AppConstant.APP_URL+'/bidding/auctionBidSubmission');				
		};
		var AllCommodityBid = function(){
			return $resource(AppConstant.APP_URL+'/bidding/getAllCommodityBid');				
		};
		var PreferredCommodity = function(){
			return $resource(AppConstant.APP_URL+'/bidding/setPreferredCommodity');				
		};
		var BidTableColumnList = function(){
			return $resource(AppConstant.WEB_URL+'/resources/data/bid-list-grid.json');;
		};
		var getAllPreferredCommodity = function(){
			return $resource(AppConstant.APP_URL+'/dashboard/getAllPreferredCommodity');				
		};
		var removePreferredCommodity = function(){
			return $resource(AppConstant.APP_URL+'/dashboard/removePreferredCommodity');				
		};

		return {
			"getBidList": BidList,
			"bidSubmission" : NewBid,
			"getAllCommodityBid" : AllCommodityBid,
			"setPreferredCommodity" : PreferredCommodity,
			"getBidTableColumnList" : BidTableColumnList,
			"getAllPreferredCommodity" : getAllPreferredCommodity,
			"removePreferredCommodity" :removePreferredCommodity,
		};

	});

})();