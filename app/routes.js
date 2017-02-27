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
                controller: 'dashboardController'
            })
			.state('bidding', {
                url: '/newBidList',
                templateUrl: './bidding/bidding.component.html',
                controller: 'biddingController'
            }) 
			
            .state('login', {
                url: '/login',
                templateUrl: './auth/login.component.html',
                controller: 'authController'    
            })
            .state('logout', {
                url: '/logout',
                template: '',
                abstract:true,
                controller: 'authController'    
            });
            
    });

})();

