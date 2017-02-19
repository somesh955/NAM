(function(){
	'use-strict';
	angular.module('myApp.requestService',[])
	.service('CommonRequestServ',['deviceDetector',function(deviceDetector){
			var model = this;
			model.getdeviceInfomation = function(){
				return deviceDetector
			}
			return model;		
	}])
})();