(function(){
'use-strict',
    angular.module('myApp.routes', [])

    .config(function($stateProvider, $urlRouterProvider) {
    
        $urlRouterProvider.otherwise('/login');
        
        $stateProvider
            
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: './home/home.component.html',
                controller: 'homeController'
            })
            
            .state('login', {
                url: '/login',
                templateUrl: './auth/login.component.html',
                controller: 'authController'    
            });
            
    });

})();

