(function(){
	
	angular.module('myApp.utilService',[])
	.factory('UtilsServ',function($resource){
		return {
			"responseType": {
				"EXECUTED" : 'S',
				"FAILED" : 'F',
				"NOTFOUND" : 404,
				"WARNING" : 302
			},
			"isUndefiedOrNull" : function(value){
				if(typeof value === Object)
					return (value !== undefined && value !== null && value !== "");
				else if(value instanceof Array)
					return (value.length > 0);
				else
					return false;
			}
		};
	});
})();