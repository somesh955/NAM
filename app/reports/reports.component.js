(function(){
    'use-strict',

    angular.module('myApp.reportsCtrl',[])
                          
    .controller('reportsController', ['$scope','$http','$rootScope','AuthServ','ReportsServ','UtilsServ','LoggerServ','growl','Spinner','StorageService','$window', function($scope,$http,$rootScope, AuthServ, ReportsServ, UtilsServ, LoggerServ, growl,Spinner,StorageService,$window){        

        $rootScope.injectHdr=null;
	     $scope.onInit = function(){           
    		  if((AuthServ.userDetails().userType) === "G"){      
                 $scope.stateList = AuthServ.userDetails().stateResponse;
             }else if((AuthServ.userDetails().userType) === "S"){
                $scope.stateList = AuthServ.userDetails().stateResponse;
                 $scope.state=AuthServ.userDetails().stateResponse[0].stateId;           
                 $scope.getApmcList($scope.state);
              }else{
                 $scope.stateList = AuthServ.userDetails().stateResponse;
                 $scope.state=AuthServ.userDetails().stateResponse[0].stateId;
                 $scope.getApmcList($scope.state);
              } 
	     };
        $scope.onInit();

             $scope.getApmcList = function(stateId){
                // /alert(stateId);
                Spinner.startSpin();
                ReportsServ.getApmcList().save({"apmcRequest" :{"stateId": stateId}},function(response){
                    if(response.responseHeader.statusMsg === UtilsServ.responseType.EXECUTED){
                        LoggerServ.log(response);
                        $scope.ammcList = response.apmcDetails;
                        Spinner.stopSpin();
                    }else{
                        LoggerServ.log(response);
                        growl.error(response.responseHeader.errMsg);
                        Spinner.stopSpin();
                    }               
                });
             };


	     $scope.getReportsByTrader=function(reportForm){
          
             var fDate = reportForm.fromDate.split("/").reverse().join("-");
             var toDate = reportForm.toDate.split("/").reverse().join("-");
	     	 var userInfo = StorageService.getUserDetails('userInfo');
             var data={
                "P_STATEID" :+reportForm.state,
                "P_PRINTED_BY": userInfo.userName,
                "P_TRDCLAUSE":" and lcm.lcam_trn_id IN ("+userInfo.refVal+")",
                "P_OUTPUTTYPE": "pdf",
                "P_ORG_ID" :"1",
                "P_TODATE" :toDate,
                "P_OPR_NAME": "HYDERABAD",
                "P_FRDATE":fDate,
                "P_ORG_NAME" : "National Agriculture Market",
                "P_REPORT_TITLE" : "Trader Wise Winner List between period " +reportForm.fromDate +" and " +reportForm.toDate,
                "P_OPR_CLAUSE" : " and abc_opr_id IN ("+reportForm.apmc+")",
                "reportName" : "TraderBidWinnerRep.jasper"

              };
                $rootScope.injectHdr="r";
                $http({  
                        url: "http://192.168.1.232:8080/namreports/jasperservice",  
                        method: "POST",
                        data: data ,
                         headers: {  
                            "Content-Type": "application/json"  
                        } ,
                        responseType: 'arraybuffer'
                         
                    }).success(function (response) {
                      var file = new Blob([response], {type: 'application/pdf'});
                      var fileURL = URL.createObjectURL(file);
                      window.open(fileURL);
                        $rootScope.injectHdr=null;
                    })  
                    .error(function (error) {  
                         
                         $rootScope.injectHdr=null;
                }); 

               // ReportsServ.getReportsByTraderPrint().save({"data":data},function(response){
    		 
    		 	  
    		 //});
	     };

          $scope.getReportsTraderLot=function(reportForm){
          
             var fDate = reportForm.fromDate.split("/").reverse().join("-");
             var toDate = reportForm.toDate.split("/").reverse().join("-");
             var userInfo = StorageService.getUserDetails('userInfo');
             var data={
                    "P_TRADER":userInfo.refVal,
                    "P_STATEID":reportForm.state,
                    "P_PRINTED_BY":userInfo.userName,
                    "P_OUTPUTTYPE": "pdf",
                    "P_ORG_ID":"1",
                    "P_TODATE":toDate,
                    "P_OPR_NAME":"HYDERABAD",
                    "P_FRDATE":fDate,
                    "P_ORG_NAME":"National Agriculture Market",
                    "P_REPORT_TITLE":"Traders Lot Detail between period "+ fDate +" and "+ toDate,
                    "P_OPR_CLAUSE":" and AUCH_OPRID IN (49)",
                    "reportName":"TradersLotDetailsRep.jasper"

              };
                $rootScope.injectHdr="r";
                $http({  
                        url: "http://192.168.1.232:8080/namreports/jasperservice",  
                        method: "POST",
                        data: data ,
                         headers: {  
                            "Content-Type": "application/json"  
                        } ,
                        responseType: 'arraybuffer'
                         
                    }).success(function (response) {
                      var file = new Blob([response], {type: 'application/pdf'});
                      var fileURL = URL.createObjectURL(file);
                      window.open(fileURL);
                        $rootScope.injectHdr=null;
                    })  
                    .error(function (error) {  
                         
                         $rootScope.injectHdr=null;
                }); 

               // ReportsServ.getReportsByTraderPrint().save({"data":data},function(response){
             
                  
             //});
         };

         
			
	     
    }]);
})();
