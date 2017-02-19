(function(){
	
	angular.module('myApp.utilService',[])
	.factory('UtilsServ',['$filter','AppConstant',function($filter, AppConstant){


		var getDateFormat = function(date){
			if(date !== null && date !== undefined){
				return date.replace("Z",'');
			}else{
				return true;
			}
		};

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
			},
			getDateFormat : getDateFormat,
			setDateFormat : function(date){
				if(null !== date && undefined !== date){
					return dateFormat(new Date(date), AppConstant.SERVER_DATEFORMAT);
				}else{
					return dateFormat(new Date(), AppConstant.SERVER_DATEFORMAT);	
				}				
			},
			isSessionExpire : function(expireTime){
				var result = false;
				if(expireTime !== null && expireTime !== undefined){
					result = ((new Date(getDateFormat(expireTime))).getUTCMilliseconds() > (new Date().getUTCMilliseconds()))	
				}				
				return result;
			}
		};
	}]);
})();