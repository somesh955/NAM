(function(){
'use-strict',
    angular.module('myApp.routes', [])

    .config(function($stateProvider, $urlRouterProvider) {
    
        $urlRouterProvider.otherwise('/home');
        
        $stateProvider
            
            .state('home', {
                url: '/home',
                templateUrl: './home/home.component.html',
                controller: 'homeController'
            })
            
            .state('about', {
                    
            });
            
    });

})();

