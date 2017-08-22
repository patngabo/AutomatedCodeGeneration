'use strict';

/* Module for TblGenre */

var tblGenreModule = angular.module('tblGenre.module', ['myApp']);

/**
 * Module for tblGenre
 */
tblGenreModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/tblGenre',    {templateUrl: 'partials/tblgenre/tblgenre_list.html', controller: 'TblGenreCtrl'});
    $routeProvider.when('/tblGenre/new', {templateUrl: 'partials/tblgenre/tblgenre_form.html', controller: 'TblGenreCtrl'});
    $routeProvider.when('/tblGenre/:genreId', {templateUrl: 'partials/tblgenre/tblgenre_form.html', controller: 'TblGenreCtrl'});
}]);
