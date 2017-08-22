'use strict';

/* Module for TblBookGenres */

var tblBookGenresModule = angular.module('tblBookGenres.module', ['myApp']);

/**
 * Module for tblBookGenres
 */
tblBookGenresModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/tblBookGenres',    {templateUrl: 'partials/tblbookgenres/tblbookgenres_list.html', controller: 'TblBookGenresCtrl'});
    $routeProvider.when('/tblBookGenres/new', {templateUrl: 'partials/tblbookgenres/tblbookgenres_form.html', controller: 'TblBookGenresCtrl'});
    $routeProvider.when('/tblBookGenres/:genreId/:bookid', {templateUrl: 'partials/tblbookgenres/tblbookgenres_form.html', controller: 'TblBookGenresCtrl'});
}]);
