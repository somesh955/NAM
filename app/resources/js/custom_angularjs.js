var commlink="http://localhost:8080/NamWebSrv/rest/";

var namApp = angular.module('namApp', []);


  namApp.controller('customersCtrl', function ($scope, $http) { 
	
        $http({  
            url: commlink+'PortalMain',  
            method: 'POST',
			crossDomain: 'true',			
			data: "language=en",  
            headers: {  
                "Content-Type": "application/x-www-form-urlencoded"  
            }  
        }).success(function (response) {  
			$scope.names = response.mainDashList;
        });  
    }); 

var app = angular.module('maxApp', []);
app.controller('filterCtrls', function($scope,$http) {
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!

var yyyy = today.getFullYear();
if(dd<10){
    dd='0'+dd;
} 
if(mm<10){
    mm='0'+mm;
} 
var today = dd+'/'+mm+'/'+yyyy;
//var today = mm+'/'+dd+'/'+yyyy;
$scope.fromDate = today;
$scope.toDate = today;

  $http({  
            url: commlink+'MastersUpdate/getStates?language=en',  
            method: 'GET',
			crossDomain: 'true',
            headers: {  
                "Content-Type": "application/x-www-form-urlencoded"  
            }  
        }).success(function (response) {  
			$scope.states = response.listStates;
        });
		
		
		//http request for get Apmc list
		$scope.listChangeApmc = function() {
			 
		  $scope.apmc=null;
			
			$http({  
				url: commlink+'MastersUpdate/getApmc?language=en&stateId'+$scope.state,  
				method: 'GET',
				crossDomain: 'true',
				headers: {  
					"Content-Type": "application/x-www-form-urlencoded"  
				}  
			}).success(function (response) {  
				$scope.apmsList = response.listStateApmc;
			});
			
			 $scope.commodity=null;
			 $scope.commodityList1=[];
		    $scope.urls=commlink+'MastersUpdate/getProducts?language=en&stateId='+$scope.state ;
		       $http({  
		            url: $scope.urls,
		            method: 'GET',
					crossDomain: 'true',					
		             headers: {  
		                "Content-Type": "application/json;"  
		            }  
		        }).success(function (response) {  
		        	$scope.commodityList1 = response.listCommodity;
		        	
		        });
		};
		

		//http request for get all commodity List
		 $http({  
	            url: commlink+'MastersUpdate/getProducts?language=en',
	            method: 'GET',
			crossDomain: 'true',		
	             headers: {  
	                "Content-Type": "application/json;"  
	            }  
	        }).success(function (response) {  
	        	$scope.commodityList = response.listCommodity;
				
	        })  
	        .error(function (error) { 
	        });
		
		//http request for get all commodity grid first time
		    var fromD = $scope.fromDate.split("/").reverse().join("-") + " 00:00:00";
	        var toDate = $scope.toDate.split("/").reverse().join("-") + " 23:59:59";
		$http({  
            url: commlink+'mobile/getCommodity',  
            method: 'POST',
			data: "language=en&fromDate="+fromD+"&toDate"+toDate,
			crossDomain: 'true',	
            headers: {  
                "Content-Type": "application/x-www-form-urlencoded"  
            }  
        }).success(function (response) {  
			$scope.commodityGrid = response.listCommodity;
        }); 
		
		
		$scope.commodityValue = function(commodityId) {
			 if(commodityId==null){
				$scope.commodity=null;
			 }else{
				$scope.commodity=commodityId;
			 }
			 
		};	 
			 			
			 
		//listChange method for get commodityList basedon stateId & apmcId
		 $scope.listChange = function(apmc12) {
			 
				 $scope.apmc=apmc12; 
			
			 $scope.commodity=null;
			 $scope.commodityList1=[];
		    $scope.urls=commlink+'MastersUpdate/getProducts?language=en&stateId='+$scope.state +'&apmcId='+$scope.apmc;
		       $http({  
		            url: $scope.urls,
		            method: 'GET',
					crossDomain: 'true',					
		             headers: {  
		                "Content-Type": "application/json;"  
		            }  
		        }).success(function (response) {  
		        	$scope.commodityList1 = response.listCommodity;
		        	
		        });		       
		   };
		   
		   
		   //http request for get all commodity grid based on search
		 $scope.searchCommodity = function() {
			
			 if($scope.state==null){
				 $scope.state=null;
			 }
			 
			 if($scope.apmc==null){
				  $scope.apmc=null;
			 }
			 if($scope.commodity==null){
				  $scope.commodity=null;
			 }
				var fromD = $scope.fromDate.split("/").reverse().join("-") + " 00:00:00";
	        var toDate = $scope.toDate.split("/").reverse().join("-") + " 23:59:59";
				
				 
				 $scope.commodityGrid=[];
				$http({  
					url: commlink+'mobile/getCommodity',  
					method: 'POST',
					data:"language=en&stateId="+$scope.state+"&apmcId="+$scope.apmc+"&commodityId="+$scope.commodity+"&fromDate="+fromD+"&toDate"+toDate,
					crossDomain: 'true',					
					headers: {  
						"Content-Type": "application/x-www-form-urlencoded"  
					}  
				}).success(function (response) { 
					$scope.commodityGrid = response.listCommodity;
				}); 
		
		 };
		   
		   
		
    });
	
	/*===================================dashboard3============================================*/
	
	var app1 = angular.module('dashboard3', []);
	
	app1.controller('dashboard3Ctrls', function($scope,$http) {	
	
    $scope.exportData = function () {
        var blob = new Blob([document.getElementById('exportable').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "Report.xls");
    };
	
		$scope.stateIds=null;		
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; //January is 0!

			var yyyy = today.getFullYear();
			if(dd<10){
				dd='0'+dd;
			} 
			if(mm<10){
				mm='0'+mm;
			} 
			var today = dd+'/'+mm+'/'+yyyy;
			//var today = mm+'/'+dd+'/'+yyyy;
			$scope.fromDate = today;
			$scope.toDate = today;
			$scope.totalValueAPMC=0;
			$scope.totalOnlineAPMC=0;
			$scope.fileName="Active State";
			var totalVAPMC = 0;
			var totalOnlAPMC = 0;
			$scope.activeStateGrid=null;
		
			var fromD = $scope.fromDate.split("/").reverse().join("-");
	        var toDate = $scope.toDate.split("/").reverse().join("-");
			
			$http({  
            url: commlink+'getActiveState',  
            method: 'POST',
			data: "language=en&fromDate="+fromD+"&toDate="+toDate+"&orgId=1",
			crossDomain: 'true',	
            headers: {  
                "Content-Type": "application/x-www-form-urlencoded"  
            }  
        }).success(function (response) {  
			$scope.activeStateGrid = response.listActiveState;	
				
			   for (i=0; i<$scope.activeStateGrid.length; i++) {
				totalVAPMC = totalVAPMC + $scope.activeStateGrid[i].oprCount*1; 
				$scope.totalValueAPMC=totalVAPMC;	
				totalOnlAPMC = totalOnlAPMC + $scope.activeStateGrid[i].activeCount*1; 
				$scope.totalOnlineAPMC=totalOnlAPMC;				
			
				};
			
       }); 
		//alert(JSON.stringify($scope.activeStateGrid));
				
		$scope.filterMandi=function(){
			var totalVAPMC = 0;
			var totalOnlAPMC = 0;
			$scope.totalValueAPMC=0;
			$scope.totalOnlineAPMC=0;
			
					var fromD1 = $scope.fromDate.split("/").reverse().join("-") + " 00:00:00";
					var toDate1 = $scope.toDate.split("/").reverse().join("-") + " 23:59:59";					
					
				$http({  
					url: commlink+'getActiveState',  
					method: 'POST',
					data: "language=en&fromDate="+fromD1+"&toDate="+toDate1+"&orgId=1",
					crossDomain: 'true',	
					headers: {  
						"Content-Type": "application/x-www-form-urlencoded"  
					}  
				}).success(function (response) { 
					
					$scope.activeStateGrid = response.listActiveState;	
				
					   for (i=0; i<$scope.activeStateGrid.length; i++) {
						totalVAPMC = totalVAPMC + $scope.activeStateGrid[i].oprCount*1; 
						$scope.totalValueAPMC=totalVAPMC;	
						totalOnlAPMC = totalOnlAPMC + $scope.activeStateGrid[i].activeCount*1; 
						$scope.totalOnlineAPMC=totalOnlAPMC;	
						};				
					
				});
		};
		
		
		$scope.getAPMCState=function(stateId,stateName){
			$scope.stateNameSelected=stateName;
			$scope.stateIds=stateId;
			
			var fromD1 = $scope.fromDate.split("/").reverse().join("-") + " 00:00:00";
			var toDate1 = $scope.toDate.split("/").reverse().join("-") + " 23:59:59";					
					
				$http({  
					url: commlink+'getActiveApmc',  
					method: 'POST',
					data: "language=en&fromDate="+fromD1+"&toDate="+toDate1+"&orgId=1&oprId="+stateId,
					crossDomain: 'true',	
					headers: {  
						"Content-Type": "application/x-www-form-urlencoded"  
					}  
				}).success(function (response) {  
					$scope.getActiveApmc = response.listActiveApmc;						  				
					
				});
			
		};
		
		
		
		
		

});

/*===================================dashboard5============================================*/
	
	var dashb5 = angular.module('dashboard5', []);
	
	dashb5.controller('dashboard5Ctrls', function($scope,$http,$timeout) {
		
		$scope.stateIds=null;		
		
		
		 $scope.getData=function(){	
			$scope.totalBuyer = 0;
			$scope.totalCAgent = 0;
			$scope.totalServiceProvider = 0;
			$scope.totalSeller = 0;
			var totalBuyer = 0;
			var totalCAgent = 0;
			var totalServiceProvider = 0;
			var totalSeller = 0;
			
		 
				$http({  
				url: commlink+'getPortalUserRegisteredState',  
				method: 'POST',
				data: "language=en",
				crossDomain: 'true',	
				headers: {  
					"Content-Type": "application/x-www-form-urlencoded"  
				}  
			}).success(function (response) {  
				$scope.activeUserStateGrid = response.portalUserStateList;	
				   for (i=0; i<$scope.activeUserStateGrid.length; i++) {
					totalBuyer = totalBuyer + $scope.activeUserStateGrid[i].trader*1; 					
					$scope.totalBuyer=totalBuyer;
					
					totalCAgent = totalCAgent + $scope.activeUserStateGrid[i].commsionAgent*1; 					
					$scope.totalCAgent=totalCAgent;
								
					totalServiceProvider = totalServiceProvider + $scope.activeUserStateGrid[i].serviceProvider*1; 					
					$scope.totalServiceProvider=totalServiceProvider;
					
					totalSeller = totalSeller + $scope.activeUserStateGrid[i].farmer*1; 					
					$scope.totalSeller=totalSeller;				
					};
				
			}); 
		};
		
		
		// Function to replicate setInterval using $timeout service.
		  $scope.intervalFunction = function(){
			$timeout(function() {      
			  $scope.intervalFunction();
			}, 1000000)
		  };

		  // Kick off the interval
		  $scope.intervalFunction();
		  $scope.getData();	
		
		
		
		
		$scope.getRegisterAPMCState=function(stateId,stateName){
			$scope.stateNameSelected=stateName;
			$scope.stateIds=stateId;
			$scope.totalBuyer = null;
			$scope.totalCAgent = null;
			$scope.totalServiceProvider =null;
			$scope.totalSeller = null;
			var totalBuyer = 0;
			var totalCAgent = 0;
			var totalServiceProvider = 0;
			var totalSeller = 0;
				
				$http({  
					url: commlink+'getPortalUserRegisteredApmc',  
					method: 'POST',
					data: "language=en&stateId="+stateId,
					crossDomain: 'true',	
					headers: {  
						"Content-Type": "application/x-www-form-urlencoded"  
					}  
				}).success(function (response) {  
					$scope.getPortalUserRegisteredApmc = response.portalUserApmcList;	
					
					 for (i=0; i<$scope.getPortalUserRegisteredApmc.length; i++) {
					totalBuyer = totalBuyer + $scope.getPortalUserRegisteredApmc[i].trader*1; 					
					$scope.totalBuyer=totalBuyer;
					
					totalCAgent = totalCAgent + $scope.getPortalUserRegisteredApmc[i].commsionAgent*1; 					
					$scope.totalCAgent=totalCAgent;
								
					totalServiceProvider = totalServiceProvider + $scope.getPortalUserRegisteredApmc[i].serviceProvider*1; 					
					$scope.totalServiceProvider=totalServiceProvider;
					
					totalSeller = totalSeller + $scope.getPortalUserRegisteredApmc[i].farmer*1; 					
					$scope.totalSeller=totalSeller;				
					};
					
				});
			
		};
		
});

/*===================================dashboard1============================================*/

var dashb1 = angular.module('dashboard1', []);
	
	dashb1.controller('dashboard1Ctrls', function($scope,$http) {
		
		var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; //January is 0!

			var yyyy = today.getFullYear();
			if(dd<10){
				dd='0'+dd;
			} 
			if(mm<10){
				mm='0'+mm;
			} 
			var today = dd+'/'+mm+'/'+yyyy;
			$scope.fromDate = today;
			$scope.toDate = today;
			
			//var today = mm+'/'+dd+'/'+yyyy;
			
			
		
		//http request for get all commodity List
		 $http({  
	            url: commlink+'MastersUpdate/getProducts?language=en',
	            method: 'GET',
				crossDomain: 'true',		
	             headers: {  
	                "Content-Type": "application/json;"  
	            }  
	        }).success(function (response) {  
	        	$scope.commodityList = response.listCommodity;
				
	        });
			
	$scope.getGraphs=function(){
			var fDate = $scope.fromDate.split("/").reverse().join("-") + " 00:00:00";	
			var toD = $scope.toDate.split("/").reverse().join("-") + " 23:59:59";		 
		
		var dataPoints=[];
		
		var chart = new CanvasJS.Chart("chartContainer",
		{
			axisY:{
			  title:"Arrivals",
			},
			axisX:{
			  title:"Commodity",
			},
		   title:{
			text: "Commodity Arrivals", 
			fontWeight: "bolder",
			fontColor: "#008B8B",
			fontfamily: "tahoma",        
			fontSize: 25,
			padding: 10        
		  },
		  data: [
		  {        
			type: "column",
			click: onClick,
		   dataPoints: dataPoints		
		 }
		  ]
		});
			
		
		$.post(commlink + "GraphDtl/getArrivalGraph",
		{	
		language:"en",
		orgId:"1",
		fromDate: fDate,
		toDate: toD
		},
		function(data, status){	
				for (var i = 0; i < data.arrivalList.length; i++) {
				   dataPoints.push({ label: data.arrivalList[i].prodName, y: +data.arrivalList[i].grossQty });
				}					
				chart.options.data.dataPoints = dataPoints;		
				chart.render();
		});	
	};
	function onClick(e) {
		//alert(  e.dataSeries.type + ", dataPoint { x:" + e.dataPoint.label + ", y: "+ e.dataPoint.y + " }" );
	     $scope.commodityTable(e.dataPoint.label)  
	}
	
	
	
	$scope.commodityTable=function(selectedCom){
			$scope.selectedCommodity=selectedCom;
			var fDate = $scope.fromDate.split("/").reverse().join("-") + " 00:00:00";	
			var toD = $scope.toDate.split("/").reverse().join("-") + " 23:59:59";	
	         $http({  
					url: commlink+'GraphDtl/getCommodityArrival',  
					method: 'POST',
					data: "language=en&fromDate="+fDate+"&toDate="+toD+"&orgId=1&commodity="+selectedCom,
					crossDomain: 'true',	
					headers: {  
						"Content-Type": "application/x-www-form-urlencoded"  
					}  
				}).success(function (response) {  
					$scope.activeCommodityGrid = response.commodityArrivalList;						  				
					
				});
	
	};
			
	});
	
	
	/*===================================dashboard2============================================*/

var dashb1 = angular.module('dashboard2', []);
	
	dashb1.controller('dashboard2Ctrls', function($scope,$http) {
		
		var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; //January is 0!

			var yyyy = today.getFullYear();
			if(dd<10){
				dd='0'+dd;
			} 
			if(mm<10){
				mm='0'+mm;
			} 
			var today = dd+'/'+mm+'/'+yyyy;
			$scope.fromDate = today;
			$scope.toDate = today;
			
			//var today = mm+'/'+dd+'/'+yyyy;
			
			
		
		//http request for get all commodity List
		 $http({  
	            url: commlink+'MastersUpdate/getProducts?language=en',
	            method: 'GET',
				crossDomain: 'true',		
	             headers: {  
	                "Content-Type": "application/json;"  
	            }  
	        }).success(function (response) {  
	        	$scope.commodityList = response.listCommodity;
				
	        });
			
	$scope.getGraphs=function(){
		$scope.selectedCommodity=null;
			var fDate = $scope.fromDate.split("/").reverse().join("-") + " 00:00:00";	
			var toD = $scope.toDate.split("/").reverse().join("-") + " 23:59:59";		 
		
		var dataPoints=[];
		
		var chart = new CanvasJS.Chart("chartContainer",
		{
			axisY:{
			  title:"Price",
			},
			axisX:{
			  title:"Commodity",
			},
		   title:{
			text: "Commodity Price", 
			fontWeight: "bolder",
			fontColor: "#008B8B",
			fontfamily: "tahoma",        
			fontSize: 25,
			padding: 10        
		  },
		  data: [
		  {        
			type: "column",
			click: onClick,
		   dataPoints: dataPoints		
		 }
		  ]
		});
			
		
		$.post(commlink + "GraphDtl/getArrivalGraph",
		{	
		language:"en",
		orgId:"1",
		fromDate: fDate,
		toDate: toD
		},
		function(data, status){	
				for (var i = 0; i < data.arrivalList.length; i++) {
				   dataPoints.push({ label: data.arrivalList[i].prodName, y: +data.arrivalList[i].grossQty });
				}					
				chart.options.data.dataPoints = dataPoints;		
				chart.render();
		});	
	};
	function onClick(e) {
		//alert(  e.dataSeries.type + ", dataPoint { x:" + e.dataPoint.label + ", y: "+ e.dataPoint.y + " }" );
	     $scope.commodityTable(e.dataPoint.label)  
	}
	
	
	
	$scope.commodityTable=function(selectedCom){
			$scope.selectedCommodity=selectedCom;
			var fDate = $scope.fromDate.split("/").reverse().join("-") + " 00:00:00";	
			var toD = $scope.toDate.split("/").reverse().join("-") + " 23:59:59";	
	         $http({  
					url: commlink+'GraphDtl/getCommArrivalPrice',  
					method: 'POST',
					data: "language=en&fromDate="+fDate+"&toDate="+toD+"&orgId=1&commodity="+selectedCom,
					crossDomain: 'true',	
					headers: {  
						"Content-Type": "application/x-www-form-urlencoded"  
					}  
				}).success(function (response) {  
					$scope.selectedCommodityPriceGrid = response.priceList;						  				
					
				});
	
	};
			
	});




		
		 
