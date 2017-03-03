(function(){
	'use-strict',

	angular.module('myApp.dashboardCtrl',[])

	.controller('dashboardController', ['$scope', 'MenuService','$http','AppConstant','DashboardcServ','UtilsServ',function($scope, MenuService,$http,AppConstant,DashboardcServ,UtilsServ){        

	     $scope.onInit = function(){
	     	//$scope.txtsrchdate=UtilsServ.getCurrentDate();
	     };
		 $scope.txtsrchdate="";
		 $scope.txtlotcode="";
		 $scope.txtinvno="";
		 var cmnhdr={};
	     $scope.onInit();
		 $http({  
            url: AppConstant.APP_URL+'/dashboard/getAllPreferredCommodity',  
			//url: 'http://192.168.0.186:8090/NamWebService/1.0/dashboard/getAllPreferredCommodity',  
            method: 'POST',
			crossDomain: 'true', 
			data:cmnhdr,
            headers: {  
                "Content-Type": 'application/json'  
            }  
        }).success(function (response) {  
			$scope.commodity = response;
        }).error(function(response){
				alert(response) ;
		});  

		$scope.showsearchrslt=function()
		{
			var objsrchdate=new Date($scope.txtsrchdate);
			var srchdate="";
			if (!isNaN(objsrchdate))
			{
				srchdate=objsrchdate.getFullYear()+'-'+("0" + (objsrchdate.getMonth() + 1)).slice(-2)+'-'+("0" + objsrchdate.getDate()).slice(-2);	
			}
			else
			{
				objsrchdate=new Date();
				srchdate=objsrchdate.getFullYear()+'-'+("0" + (objsrchdate.getMonth() + 1)).slice(-2)+'-'+("0" + objsrchdate.getDate()).slice(-2);	
			}
			$scope.getsearchdata(srchdate);
			$scope.getinvoicedtl(srchdate,$scope.txtlotcode,$scope.txtinvno);
	var dataPoints=[];		
var chart = new CanvasJS.Chart("pieChartTeadeContainer",
{
		title:{
			/*text: "Gaming Consoles Sold in 2012"*/
		},
		legend: {
			maxWidth: 350,
			itemWidth: 100
		},
		data: [
		{
			type: "pie",
			showInLegend: true,
			toolTipContent: "{y} - #percent %",
			legendText: "{label}",
		
			/*click: onClick,*/
		   dataPoints: dataPoints		
		 
		}]
	});

			DashboardcServ.getTradeHistory().save({"tradeHistoryRequest": {"fromDate": srchdate,"toDate":srchdate}},function(response, status){
				console.log(response);
				for (var i = 0; i < response.tradeHistory.length; i++) {
					   dataPoints.push({ y: +response.tradeHistory[i].tradeCount, label: response.tradeHistory[i].tradeStatus });
					}
					chart.options.data.dataPoints = dataPoints;		
					chart.render();
			});
		};
		
		$scope.getsearchdata=function(srchdt) {
			var winbiddata={
				"winningBidRequest": {
					"commodityId": "",
					"fromDate": srchdt,
					"toDate": srchdt
				  }
			};

			 $http({  
				url: AppConstant.APP_URL+'/dashboard/getAllWinningBids',  
				//url: 'http://192.168.0.186:8090/NamWebService/1.0/dashboard/getAllPreferredCommodity',  
				method: 'POST',
				crossDomain: 'true', 
				data:winbiddata,
				headers: {  
					"Content-Type": 'application/json'  
				}  
			}).success(function (response) {  
				$scope.outcry = response;
			}).error(function(response){
					alert(response) ;
			});  

		};
		
		$scope.getinvoicedtl=function (srchdt,lotcode,invno) {
			var invoicedata={
				"invoiceRequest": {
					"commodityId": "",
					"fromDate": srchdt,
					"toDate": srchdt,
					"invoiceNo": invno,
					"lotCode": lotcode,
					"recordLimit": ""
				}
			};

			 $http({  
				url: AppConstant.APP_URL+'/dashboard/getInvoices',  
				//url: 'http://192.168.0.186:8090/NamWebService/1.0/dashboard/getAllPreferredCommodity',  
				method: 'POST',
				crossDomain: 'true', 
				data:invoicedata,
				headers: {  
					"Content-Type": 'application/json'  
				}  
			}).success(function (response) {  
				$scope.invoicedtl = response;
			}).error(function(response){
					alert(response) ;
			});  

		};

		if ($scope.txtsrchdate=="" || $scope.txtlotcode=="" || $scope.txtinvno=="")
		{
			var objschdt=new Date();
			srcdt=objschdt.getFullYear()+'-'+("0" + (objschdt.getMonth() + 1)).slice(-2)+'-'+("0" + objschdt.getDate()).slice(-2);	
			$scope.getsearchdata(srcdt);
			$scope.getinvoicedtl(srcdt,$scope.txtlotcode,$scope.txtinvno);
		}


    }]);
})();