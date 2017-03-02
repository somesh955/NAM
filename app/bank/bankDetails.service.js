(function(){
	
	angular.module('myApp.bankDetailsService',[])
	.factory('BankServ',function($resource, AppConstant){

		var getBankDetails = function(){
			return $resource(AppConstant.APP_URL+'/bankDetails/getBankDetails'); 
		};
		var setBankDetails = function(){
			return $resource(AppConstant.APP_URL+'/bankDetails/setBankDetails'); 
		};

		return {
			"getBankDetails" : getBankDetails,
			"setBankDetails" : setBankDetails,
		};

	});

})();