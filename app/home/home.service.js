(function(){
	
	angular.module('myApp.homeService',[])
	.factory('BiddingServ',function($resource, $http, $httpParamSerializer){
		return {
			'getDetails': function(){
				return $resource('http://127.0.0.1:8080/NamWebSrv/rest/mobile/bidding/getNewBid',{},{headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});				
				//return $resource('http://localhost:3000/resources/data/biddingDetails.json',{},{specialAction: {method: 'GET'}});				

			},
			getDetailsUsingHttp:function(data , clb){
				return $http({
				    method: 'POST',
				    url: 'http://192.168.0.85:8080/NamWebSrv/rest/mobile/bidding/getNewBid',
				    data: data,
				    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).success(function(response){
					console.log(response);
					clb(response) ;
				});
			},
			doBid : function(data,clb){
				return $http({
				    method: 'POST',
				    url: 'http://192.168.0.85:8080/NamWebSrv/rest/mobile/bidding/AuctionBidSubmission',
				    data: $httpParamSerializer(data),
				    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).success(function(response){
					console.log(response);
					clb(response) ;
				}).error(function(){
					console.log(response);
					clb(response) ;
				});
			}
		}

	});

})();