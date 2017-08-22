'use strict';

/* Module for TblBookAuthors */

var tblBookAuthorsModule = angular.module('tblBookAuthors.module', ['myApp']);

/**
 * Module for tblBookAuthors
 */
tblBookAuthorsModule.config(['$routeProvider', function($routeProvider) {
    // Pages routes
    $routeProvider.when('/tblBookAuthors',    {templateUrl: 'partials/tblbookauthors/tblbookauthors_list.html', controller: 'TblBookAuthorsCtrl'});
    $routeProvider.when('/tblBookAuthors/new', {templateUrl: 'partials/tblbookauthors/tblbookauthors_form.html', controller: 'TblBookAuthorsCtrl'});
    $routeProvider.when('/tblBookAuthors/:bookid/:authorid', {templateUrl: 'partials/tblbookauthors/tblbookauthors_form.html', controller: 'TblBookAuthorsCtrl'});
}]);
