(function(){
	
	angular.module('myApp.loggerService',[])
	.factory('LoggerServ',function($resource, AppConstant){
		return {
			"log": function(data){
				if(AppConstant.DEV_MODE)
					console.log(data);
			},
			"error": function(data){
				if(AppConstant.DEV_MODE)
					console.error(data);
			},
			"warn": function(data){
				if(AppConstant.DEV_MODE)
					console.warn(data);
			},
			"info": function(data){
				if(AppConstant.DEV_MODE)
					console.info(data);
			}
		};
	});
})();