(function(){
	
	angular.module('myApp.utilService',[])
	.factory('UtilsServ',function($resource, $filter){
		return {
			"responseType": {
				"EXECUTED" : 'S',
				"FAILED" : 'F',
				"NOTFOUND" : 404,
				"WARNING" : 302
			},
			"isUndefinedOrNull" : function(value){
				if(typeof value === Object)
					return (value !== undefined && value !== null && value !== "");
				else if(value instanceof Array)
					return (value.length > 0);
				else
					return false;
			},
			dateFormat : function(date, format){
				return (date !== undefined && date !== null && date !== "") ? $filter('date')(new Date(date), format) : null;
			}
		};
	});
})();