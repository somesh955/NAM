
(function(){
	'use-strict',

	angular.module('myApp.bidhistoryCtrl',[])
						  
	.controller('bidhistoryController', function($scope, $rootScope, mybidhstServ){
		$scope.txtfromdate="";
		$scope.txttodate="";
        $scope.showbidhstlist = function(){
			var fdate="";
			var tdate="";
			var objfdate;
			var objtdate;
			var msg="";
			if ($scope.txtfromdate!="")
			{
				objfdate=new Date($scope.txtfromdate);
				if (!isNaN(objfdate))
				{
					fdate=objfdate.getFullYear()+'-'+("0" + (objfdate.getMonth() + 1)).slice(-2)+'-'+("0" + objfdate.getDate()).slice(-2);	
				}
				else
				{
					msg="Invalid From Date";
					fdate="";
				}
			}
			else 
			{
				msg+="Enter From Date\n";
			}
			if ($scope.txttodate!="")
			{

				objtdate=new Date($scope.txttodate);
				if (!isNaN(objtdate))
				{
					tdate=objtdate.getFullYear()+'-'+("0" + (objtdate.getMonth() + 1)).slice(-2)+'-'+("0" + objtdate.getDate()).slice(-2);	
				}
				else
				{
					msg="Invalid To Date";
					tdate="";
				}
			}
			else
			{
				msg+="Enter To Date\n";
			}
			if (fdate!="" && tdate!="")
			{
				if (objfdate > objtdate)
				{
					msg="From Date Must Be Less Than To Date";
					fdate="";
					tdate="";
				}
			}
			var bidhstdata= {
								"bidHistoryRequest": {
									"commodityId": "",
									"fromDate": fdate,
									"toDate": tdate
								}
							};
			if (fdate!="" && tdate!="")
			{
				mybidhstServ.getmybidhst(bidhstdata,function(response){
					$scope.bidhstdetail=response;
				});
			}
			else 
			{
				alert(msg);
			}
        };
		
    });
})();