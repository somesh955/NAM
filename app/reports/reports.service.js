(function(){
	
	angular.module('myApp.reportsService',[])
	.factory('ReportsServ',function($resource,AppConstant){

		var getApmcList =function(){
			return $resource(AppConstant.APP_URL+'/masters/getApmc'); 
		};

		var getReportsByTrader=function(){
			return ("http://192.168.1.232:8080/namreports/jasperservice"); 
		}


		return {
			'getApmcList' :getApmcList,
			'getReportsByTraderPrint' :getReportsByTrader
		};
	});

})();