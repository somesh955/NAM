(function(){
	'use-strict',

	angular.module('myApp.allCommodityBidListCtrl',[])

	.controller('allCommodityBidListController', ['$scope', '$rootScope','AuthServ','BiddingServ','UtilsServ','LoggerServ','growl','Spinner', function($scope,$rootScope, AuthServ, BiddingServ, UtilsServ, LoggerServ, growl, Spinner){        

	     $scope.onInit = function(){
           
    		 BiddingServ.getAllCommodityBid().save({},function(response){
              if(response.responseHeader.statusMsg === UtilsServ.responseType.EXECUTED){
                    LoggerServ.log(response);
                    $scope.allCommodityBidList = response.allCommodityBid;
                    Spinner.stopSpin();
                }else{
                    LoggerServ.log(response);
                    growl.error(response.responseHeader.errMsg);
                    Spinner.stopSpin();
                }   
             });

              BiddingServ.getAllPreferredCommodity().save({},function(response){
              if(response.responseHeader.statusMsg === UtilsServ.responseType.EXECUTED){
                    LoggerServ.log(response);
                    $scope.allPreferredCommodityGrid = response.allPreferredCommodity;
                    Spinner.stopSpin();
                }else{
                    LoggerServ.log(response);
                    growl.error(response.responseHeader.errMsg);
                    Spinner.stopSpin();
                }   
             });

	 
	     };
				 
	     $scope.addCommodity = function(selectedCommodity){
            if(selectedCommodity == undefined){
            growl.error("Please select commodity");
            }
            else{
    	     	Spinner.startSpin();
    	     	BiddingServ.setPreferredCommodity().save({"preferredCommodityRequest" :{"commodityId": selectedCommodity}},function(response){
            		
                    if(response.responseHeader.statusMsg === UtilsServ.responseType.EXECUTED){
                        LoggerServ.log(response);
                        $scope.onInit();
                        growl.success("Successfully select commodity");
                        Spinner.stopSpin();
            		}else{
                        LoggerServ.log(response);
            			growl.error(response.responseHeader.errMsg);
            			Spinner.stopSpin();
            		}        		
            	});
            }
	     };

         $scope.deleteCommodity=function(deleteCommodity){
            Spinner.startSpin();
            BiddingServ.removePreferredCommodity().save({"removePreferredCommodityRequest" :{"commodityId": deleteCommodity}},function(response){
                
                if(response.responseHeader.statusMsg === UtilsServ.responseType.EXECUTED){
                    LoggerServ.log(response);
                    $scope.onInit();
                    growl.success("Successfully deleted commodity");
                    Spinner.stopSpin();
                }else{
                    LoggerServ.log(response);
                    growl.error(response.responseHeader.errMsg);
                    Spinner.stopSpin();
                }               
            });
         };
	   

	     $scope.onInit();
    }]);
})();
