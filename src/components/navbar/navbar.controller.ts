/// <reference path="../../../typings/tsd.d.ts" />

module app {
    'use strict';

    angular.module('connect')
        .controller('NavbarCtrl', function ($scope) {
            $scope.date = new Date();
        });
}
