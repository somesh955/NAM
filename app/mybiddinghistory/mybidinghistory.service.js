(function(){
	
	angular.module('myApp.bidhistoryService',[])
	.factory('mybidhstServ',['$resource', '$http', 'AppConstant',function($resource, $http, AppConstant){
		return {
			'getmybidhst': function(data,clb){				
				return $http({
				    method: 'POST',
				    url: AppConstant.APP_URL+'/bidHistory/getBidHistory',
				    data: data,
				    headers: {'Content-Type': 'application/json'}
				}).success(function(response){
					clb(response) ;
				}).error(function(response){
					clb(response) ;
				});				
			}
			
		};
	}]);
})();
