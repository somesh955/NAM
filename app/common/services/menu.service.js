(function(){
	'use-strict';

	angular.module('myApp.menuService',[])
	.factory('MenuService', ['UtilsServ', function(UtilsServ){
		var menu = [{	id: 0 , name:'Dashboard', label: 'Dashboard', href:"#/dashboard", class:"", isActive: false, isEnabled: true, isChild :  false , isAuthenticate : true},
					{   id: 1 , name:'BidList', label: 'Bid Listing', href:"#/dashboard", class:"", isActive: false, isEnabled: true, isChild : true   , isAuthenticate : true},
					{	id: 2 , name:'MyBidHistory', label: 'My Biding History', href:"#/myBidHistory", class:"", isActive: false, isEnabled: true, isChild :  false  , isAuthenticate : true},
					{   id: 3 , name:'BankDetails', label: 'Bank Details', href:"#/bankDetails", class:"", isActive: false, isEnabled: true, isChild :  false  , isAuthenticate : true},
					{   id: 4 , name:'Reports', label: 'Reports', href:"#/reports", class:"", isActive: false, isEnabled: true, isChild :  false , isAuthenticate : true},
				    // before login
					{   id: 5 , name:'Home', label: 'Home', href:"#/", class:"", isActive: false, isEnabled: true, isChild :  false , isAuthenticate : false},
					{   id: 6 , name:'NationalAgricultureMarket', label: 'National Agriculture Market', href:"#/nationalAgricultureMarket", class:"", isActive: false, isEnabled: true, isChild :  true , isAuthenticate : false},
					{   id: 7 , name:'EnrolledMandis', label: 'Enrolled Mandis', href:"#/enrolledMandis", class:"", isActive: false, isEnabled: true, isChild :  false , isAuthenticate : false},
					{   id: 8 , name:'CommodityDetails', label: 'Commodity Details', href:"#/commodityDetails", class:"", isActive: false, isEnabled: true, isChild :  true , isAuthenticate : false},
					{   id: 9 , name:'UsefullLinks', label: 'Usefull Links', href:"#/usefullLinks", class:"", isActive: false, isEnabled: true, isChild :  false , isAuthenticate : false},
					{   id: 10 , name:'Feedback', label: 'Feedback', href:"#/feedback", class:"", isActive: false, isEnabled: true, isChild :  false , isAuthenticate : false},
					{   id: 11 , name:'Faq', label: 'Faq', href:"#/faq", class:"", isActive: false, isEnabled: true, isChild :  false , isAuthenticate : false},
					{   id: 12 , name:'ContactUs', label: 'Contact us', href:"#/contactUs", class:"", isActive: false, isEnabled: true, isChild :  false , isAuthenticate : false},
					{   id: 13 , name:'OnlineRegistrationGuideline', label: 'Online Registration Guideline', href:"#/onlineRegistrationGuideline", class:"", isActive: false, isEnabled: true, isChild :  false , isAuthenticate : false},
					];

		var subMenu = [{	id: 0 , name:'NewBidList', label: 'New Bid Listing', href:"#/newBidList", class:"", isActive: false, isEnabled: true, parent_id: 1, isAuthenticate : true},
					   {    id: 1 , name:'AllCommodityBidlist', label: 'All Commodity Bid Lisitng', href:"#/allCommodityBidlist", class:"", isActive: false, isEnabled: true, parent_id: 1, isAuthenticate : true},
					   {    id: 2 , name:'AboutNam', label: 'About NAM', href:"#/allCommodityBidlist", class:"", isActive: false, isEnabled: true, parent_id: 6, isAuthenticate : false},
					   {    id: 3 , name:'KeyStackholders', label: 'Key Stackholders', href:"#/allCommodityBidlist", class:"", isActive: false, isEnabled: true, parent_id: 6, isAuthenticate : false},
					   {    id: 4 , name:'ImplementaionsProgress', label: 'Implementaions Progress', href:"#/implementaionsProgress", class:"", isActive: false, isEnabled: true, parent_id: 6, isAuthenticate : false},
					   {    id: 5 , name:'ApprovedCommodity', label: 'Approved Commodity', href:"#/approvedCommodity", class:"", isActive: false, isEnabled: true, parent_id: 8, isAuthenticate : false},
					   {    id: 6 , name:'CommodityQualityParameter', label: 'Commodity Quality Parameter', href:"#/commodityQualityParameter", class:"", isActive: false, isEnabled: true, parent_id: 8, isAuthenticate : false}
					  ];

		var getParentMenu = function(){
			return menu;
		};
		var getChildMenu = function(){
			return subMenu;
		};
		var isValuePresent = function(Arr, name){
			return Arr.find(function(res){
						return (res.name.toLowerCase() === name.toLowerCase());
					});
		}
		var process = function(Arr, name, type , status ){
			if(typeof Arr === Array){
				if(!UtilsServ.isUndefinedOrNull(isValuePresent(Arr, name))){
					Arr.forEach(function(result){
						result[type] = (result.name.toLowerCase() === name.toLowerCase()) ? status || true : false;
					});		
				}				
			}else if(typeof Arr === Object){
				Arr[type] = (Arr.name.toLowerCase() === name.toLowerCase()) ? status || true : false;	
			}			
		};
		var setActive = function(name, status){
			process(menu, name, 'isActive', status);
			process(subMenu, name, 'isActive', status);
		};

		var setMenuStatus = function(name, status){
			process(menu, name, 'isEnabled', status);
			process(subMenu, name, 'isEnabled', status);
		};


		return {
			'getParentMenu' : getParentMenu,
			'getChildMenu' : getChildMenu,
			'setActive' : setActive,
			'setMenuStatus' : setMenuStatus
		};
	}])

})();