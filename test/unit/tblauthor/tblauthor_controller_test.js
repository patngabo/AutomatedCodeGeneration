'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('tblAuthor.module'));
  
  describe('TblAuthorCtrl', function(){
    var TblAuthorCtrl, TblAuthor, TblBook, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// TblAuthor service
    	TblAuthor = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'tblAuthor1'});
    			return deferred.promise;
    		}
    	};
		
				TblBook = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				TblAuthorCtrl = $controller('TblAuthorCtrl', {
    		'TblAuthor': TblAuthor,
						'TblBook': TblBook,
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
    	expect($scope.tblAuthor).toBeNull();
    	expect($scope.tblAuthors).toBe('tblAuthor1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshTblAuthorList', function() {
    	// given
    	TblAuthor.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'tblAuthor2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshTblAuthorList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.tblAuthors).toBe('tblAuthor2');
    });
    
    it('refreshTblAuthor', function() {
    	// given
    	TblAuthor.get = function(authorid) {
			var deferred = $q.defer();
			deferred.resolve({data:'tblAuthor'+authorid});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshTblAuthor('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.tblAuthor).toBe('tblAuthor'+'1');
    });
    
	it('goToTblAuthorList', function() {
    	// given
    	spyOn($scope, "refreshTblAuthorList");
    	
    	// when
    	$scope.goToTblAuthorList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshTblAuthorList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/tblAuthor');
    });
    
    it('goToTblAuthor', function() {
    	// given
    	spyOn($scope, "refreshTblAuthor");
    	var authorid = 1;
    	
    	// when
    	$scope.goToTblAuthor(authorid);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshTblAuthor).toHaveBeenCalledWith(authorid);
    	expect($location.path).toHaveBeenCalledWith('/tblAuthor'+'/'+authorid);
    });
    
    it('save : create', function() {
    	// given
    	$scope.tblAuthor = {authorid:'1', name:'tblAuthor'};
    	
    	$scope.mode = 'create';
    	TblAuthor.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'tblAuthorSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.tblAuthor).toBe('tblAuthorSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.tblAuthor = {authorid:'1', name:'tblAuthor'};
    	
    	$scope.mode = 'update';
    	TblAuthor.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'tblAuthorSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.tblAuthor).toBe('tblAuthorSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	TblAuthor.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToTblAuthorList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToTblAuthorList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : tblAuthor create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/tblAuthor/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.tblAuthor).toBeNull();
    	expect($scope.tblAuthors).toBe('tblAuthor1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});