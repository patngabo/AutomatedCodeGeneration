'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('tblBookAuthors.module'));
  
  describe('TblBookAuthorsCtrl', function(){
    var TblBookAuthorsCtrl, TblBookAuthors,$rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// TblBookAuthors service
    	TblBookAuthors = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'tblBookAuthors1'});
    			return deferred.promise;
    		}
    	};
		
				TblBookAuthorsCtrl = $controller('TblBookAuthorsCtrl', {
    		'TblBookAuthors': TblBookAuthors,
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
    	expect($scope.tblBookAuthors).toBeNull();
    	expect($scope.tblBookAuthorss).toBe('tblBookAuthors1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshTblBookAuthorsList', function() {
    	// given
    	TblBookAuthors.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'tblBookAuthors2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshTblBookAuthorsList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.tblBookAuthorss).toBe('tblBookAuthors2');
    });
    
    it('refreshTblBookAuthors', function() {
    	// given
    	TblBookAuthors.get = function(bookid, authorid) {
			var deferred = $q.defer();
			deferred.resolve({data:'tblBookAuthors'+bookid+authorid});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshTblBookAuthors('1', '2');
    	$scope.$apply();
    	
    	// then
    	expect($scope.tblBookAuthors).toBe('tblBookAuthors'+'1'+'2');
    });
    
	it('goToTblBookAuthorsList', function() {
    	// given
    	spyOn($scope, "refreshTblBookAuthorsList");
    	
    	// when
    	$scope.goToTblBookAuthorsList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshTblBookAuthorsList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/tblBookAuthors');
    });
    
    it('goToTblBookAuthors', function() {
    	// given
    	spyOn($scope, "refreshTblBookAuthors");
    	var bookid = 1;
    	var authorid = 2;
    	
    	// when
    	$scope.goToTblBookAuthors(bookid, authorid);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshTblBookAuthors).toHaveBeenCalledWith(bookid, authorid);
    	expect($location.path).toHaveBeenCalledWith('/tblBookAuthors'+'/'+bookid+'/'+authorid);
    });
    
    it('save : create', function() {
    	// given
    	$scope.tblBookAuthors = {bookid:'1', authorid:'2', name:'tblBookAuthors'};
    	
    	$scope.mode = 'create';
    	TblBookAuthors.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'tblBookAuthorsSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.tblBookAuthors).toBe('tblBookAuthorsSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.tblBookAuthors = {bookid:'1', authorid:'2', name:'tblBookAuthors'};
    	
    	$scope.mode = 'update';
    	TblBookAuthors.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'tblBookAuthorsSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.tblBookAuthors).toBe('tblBookAuthorsSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	TblBookAuthors.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToTblBookAuthorsList");
    	
    	// when
    	$scope.delete('1', '2');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToTblBookAuthorsList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : tblBookAuthors create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/tblBookAuthors/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.tblBookAuthors).toBeNull();
    	expect($scope.tblBookAuthorss).toBe('tblBookAuthors1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});