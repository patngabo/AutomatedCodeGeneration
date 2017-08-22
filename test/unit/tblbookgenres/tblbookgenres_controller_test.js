'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('tblBookGenres.module'));
  
  describe('TblBookGenresCtrl', function(){
    var TblBookGenresCtrl, TblBookGenres,$rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
    beforeEach(inject(function($injector) {
    	$controller = $injector.get('$controller');
    	$q = $injector.get('$q');
    	$rootScope = $injector.get('$rootScope');
    	$scope = $rootScope.$new();
    	$routeParams = $injector.get('$routeParams');
    	$httpBackend = $injector.get('$httpBackend');
    	
    	// location is mocked due to redirection in browser : karma does not support it
    	$location = {
    		path: jasmine.createSpy("path").andCallFake(function() {
        	    return "";
        	})
    	};
    	
    	// Messages
    	MessageHandler = {
    		cleanMessage: jasmine.createSpy("cleanMessage"),
    		addSuccess: jasmine.createSpy("addSuccess"),
    		manageError: jasmine.createSpy("manageError"),
    		manageException: jasmine.createSpy("manageException"),
    	};

    	// TblBookGenres service
    	TblBookGenres = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'tblBookGenres1'});
    			return deferred.promise;
    		}
    	};
		
				TblBookGenresCtrl = $controller('TblBookGenresCtrl', {
    		'TblBookGenres': TblBookGenres,
			    		'$scope': $scope,
    		'$routeParams': $routeParams,
    		'$http': $httpBackend,
    		'$location': $location,
    		'MessageHandler': MessageHandler
    	});
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
    it('init', function() {
    	$rootScope.$apply();
    	expect($scope.mode).toBeNull();
    	expect($scope.tblBookGenres).toBeNull();
    	expect($scope.tblBookGenress).toBe('tblBookGenres1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshTblBookGenresList', function() {
    	// given
    	TblBookGenres.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'tblBookGenres2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshTblBookGenresList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.tblBookGenress).toBe('tblBookGenres2');
    });
    
    it('refreshTblBookGenres', function() {
    	// given
    	TblBookGenres.get = function(genreId, bookid) {
			var deferred = $q.defer();
			deferred.resolve({data:'tblBookGenres'+genreId+bookid});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshTblBookGenres('1', '2');
    	$scope.$apply();
    	
    	// then
    	expect($scope.tblBookGenres).toBe('tblBookGenres'+'1'+'2');
    });
    
	it('goToTblBookGenresList', function() {
    	// given
    	spyOn($scope, "refreshTblBookGenresList");
    	
    	// when
    	$scope.goToTblBookGenresList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshTblBookGenresList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/tblBookGenres');
    });
    
    it('goToTblBookGenres', function() {
    	// given
    	spyOn($scope, "refreshTblBookGenres");
    	var genreId = 1;
    	var bookid = 2;
    	
    	// when
    	$scope.goToTblBookGenres(genreId, bookid);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshTblBookGenres).toHaveBeenCalledWith(genreId, bookid);
    	expect($location.path).toHaveBeenCalledWith('/tblBookGenres'+'/'+genreId+'/'+bookid);
    });
    
    it('save : create', function() {
    	// given
    	$scope.tblBookGenres = {genreId:'1', bookid:'2', name:'tblBookGenres'};
    	
    	$scope.mode = 'create';
    	TblBookGenres.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'tblBookGenresSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.tblBookGenres).toBe('tblBookGenresSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.tblBookGenres = {genreId:'1', bookid:'2', name:'tblBookGenres'};
    	
    	$scope.mode = 'update';
    	TblBookGenres.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'tblBookGenresSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.tblBookGenres).toBe('tblBookGenresSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	TblBookGenres.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToTblBookGenresList");
    	
    	// when
    	$scope.delete('1', '2');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToTblBookGenresList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : tblBookGenres create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/tblBookGenres/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.tblBookGenres).toBeNull();
    	expect($scope.tblBookGenress).toBe('tblBookGenres1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});