(function(){
	
	angular.module('myApp.biddingService',[])
	.factory('MasterServ',function($resource, AppConstant){

		var ApmcList = function(){
			return $resource(AppConstant.APP_URL+'/masters/getApmc'); 
		};
		var CommodityList = function(){
			return $resource(AppConstant.APP_URL+'/masters/getCommodity'); 
		};
		var AgentList = function(){
			return $resource(AppConstant.APP_URL+'/masters/getCa'); 
		};

		return {
			"getApmcList" : ApmcList,
			"getCommodityList" : CommodityList,
			"getAgentList" : AgentList,
		};

	})
	.factory('BiddingServ',function($resource, AppConstant){
		var BidSearch = {};

		var getBidSearch = function(){
			return BidSearch;
		};
		var setBidSearch = function(Bid){
			return this.BidSearch = Bid;
		};

		var BidList = function(){
			return $resource(AppConstant.WEB_URL+'resources/data/v.0/biddingDetails.json'); ///bidding/getNewBid    
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
			return $resource(AppConstant.WEB_URL+'resources/data/v.0/bid-list-grid.json');;
		};

		return {
			"getBidSearch": getBidSearch,
			"setBidSearch": setBidSearch,
			"getBidList": BidList,
			"bidSubmit" : NewBid,
			"getAllCommodityBid" : AllCommodityBid,
			"setPreferredCommodity" : PreferredCommodity,
			"getBidTableColumnList" : BidTableColumnList
		};

	});

})();