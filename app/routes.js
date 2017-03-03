(function(){
'use-strict',
    angular.module('myApp.routes', [])

    .config(function($stateProvider, $urlRouterProvider) {
    
        $urlRouterProvider.otherwise('/');
        
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: './home/home.component.html',
                controller: 'homeController'               
            })   
            .state('login', {
                url: '/login',
                templateUrl: './auth/login.component.html',
                controller: 'authController'    
            })         
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: './dashboard/dashboard.component.html',
                controller: 'dashboardController',
                data: {
                   authRequired: true
                }
            })
			.state('bidding', {
                url: '/newBidList',
                templateUrl: './bidding/bidding.component.html',
                controller: 'biddingController',
                data: {
                   authRequired: true
                }
            }) 
            .state('allCommodityBidlist', {
                url: '/allCommodityBidlist',
                templateUrl: './bidding/allCommodityBidlist.component.html',
                controller: 'allCommodityBidListController',
                data: {
                   authRequired: true
                }
            })
            .state('myBidHistory', {
                url: '/myBidHistory',
                templateUrl: './mybiddinghistory/mybidinghistory.component.html',
                controller: 'bidhistoryController',
                data: {
                   authRequired: true
                }             
            })
            .state('bankDetails', {
                url: '/bankDetails',
                templateUrl: './bank/bankDetails.component.html',
                controller: 'bankDetailsController',
                data: {
                   authRequired: true
                }             
            })
            .state('reports', {
                url: '/reports',
                templateUrl: './reports/reports.component.html',
                controller: 'reportsController',
                data: {
                   authRequired: true
                }             
            });
            
    });

})();

