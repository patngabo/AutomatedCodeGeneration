'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('tblGenre.module'));
  
  describe('TblGenreCtrl', function(){
    var TblGenreCtrl, TblGenre,$rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// TblGenre service
    	TblGenre = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'tblGenre1'});
    			return deferred.promise;
    		}
    	};
		
				TblGenreCtrl = $controller('TblGenreCtrl', {
    		'TblGenre': TblGenre,
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
    	expect($scope.tblGenre).toBeNull();
    	expect($scope.tblGenres).toBe('tblGenre1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshTblGenreList', function() {
    	// given
    	TblGenre.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'tblGenre2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshTblGenreList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.tblGenres).toBe('tblGenre2');
    });
    
    it('refreshTblGenre', function() {
    	// given
    	TblGenre.get = function(genreId) {
			var deferred = $q.defer();
			deferred.resolve({data:'tblGenre'+genreId});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshTblGenre('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.tblGenre).toBe('tblGenre'+'1');
    });
    
	it('goToTblGenreList', function() {
    	// given
    	spyOn($scope, "refreshTblGenreList");
    	
    	// when
    	$scope.goToTblGenreList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshTblGenreList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/tblGenre');
    });
    
    it('goToTblGenre', function() {
    	// given
    	spyOn($scope, "refreshTblGenre");
    	var genreId = 1;
    	
    	// when
    	$scope.goToTblGenre(genreId);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshTblGenre).toHaveBeenCalledWith(genreId);
    	expect($location.path).toHaveBeenCalledWith('/tblGenre'+'/'+genreId);
    });
    
    it('save : create', function() {
    	// given
    	$scope.tblGenre = {genreId:'1', name:'tblGenre'};
    	
    	$scope.mode = 'create';
    	TblGenre.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'tblGenreSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.tblGenre).toBe('tblGenreSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.tblGenre = {genreId:'1', name:'tblGenre'};
    	
    	$scope.mode = 'update';
    	TblGenre.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'tblGenreSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.tblGenre).toBe('tblGenreSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	TblGenre.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToTblGenreList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToTblGenreList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : tblGenre create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/tblGenre/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.tblGenre).toBeNull();
    	expect($scope.tblGenres).toBe('tblGenre1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});