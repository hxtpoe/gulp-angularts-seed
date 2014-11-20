/// <reference path="../../typings/tsd.d.ts" />

module app {
    'use strict';

    angular.module('connect', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router'])
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'app/main/main.html',
                    controller: 'MainCtrl'
                });

            $urlRouterProvider.otherwise('/');
        })
}
