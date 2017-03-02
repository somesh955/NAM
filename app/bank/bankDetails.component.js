(function(){
    'use-strict',

    angular.module('myApp.bankDetailsCtrl',[])
                          
    .controller('bankDetailsController', ['$scope', '$rootScope','AuthServ','BankServ','UtilsServ','LoggerServ','growl', function($scope,$rootScope, AuthServ, BankServ, UtilsServ, LoggerServ, growl){        

	     $scope.onInit = function(){           
    		 BankServ.getBankDetails().save({},function(response){
    		 	if(response.responseHeader.statusMsg === UtilsServ.responseType.EXECUTED){
                    LoggerServ.log(response);
    		 	    $scope.bankDetails = response.bankDetails[0];
        		}else{
                    LoggerServ.log(response);
        			growl.error(response.responseHeader.errMsg);
        		}  
    		 	  
    		 });
    	     //$scope.bankDetails = AuthServ.userDetails().stateResponse;
	     };

	     $scope.setBankStatus=function(bankStatus){
	     		var status=null;
	     		BankServ.setBankDetails().save({"bankDetails":{"status": bankStatus}},function(response){
    		 	if(response.responseHeader.statusMsg === UtilsServ.responseType.EXECUTED){
                    LoggerServ.log(response);
                    if(bankStatus=='A'){
                    	status="Agree";
                        $scope.onInit();
                    }else{
                    	status="Disagree";
                    }
                  growl.success("Successfully set status "+status);
    		 	   // $scope.bankDetails = response.bankDetails[0];
        		}else{
                    LoggerServ.log(response);
        			growl.error(response.responseHeader.errMsg);
        		}  
    		 	  
    		 });
	     };
			
	     $scope.onInit();
    }]);
})();
