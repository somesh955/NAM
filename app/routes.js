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
			
            .state('login', {
                url: '/login',
                templateUrl: './auth/login.component.html',
                controller: 'authController'    
            })
            .state('myBidHistory', {
                url: '/myBidHistory',
                templateUrl: './mybiddinghistory/mybidinghistory.component.html',
                controller: 'bidhistoryController',
                data: {
                   authRequired: true
                }             
            });
            
    });

})();

