(function(){
	
	angular.module('myApp.SpinnerService',[])
	.factory('Spinner',['usSpinnerService',function(usSpinnerService){
		return {
			'startSpin' : function() {
		        usSpinnerService.spin('spinner-1');
		    },
		    'stopSpin' : function() {
		        usSpinnerService.stop('spinner-1');
		    }
		};
	}])
})();