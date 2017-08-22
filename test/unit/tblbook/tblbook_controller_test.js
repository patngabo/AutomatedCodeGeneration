'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('tblBook.module'));
  
  describe('TblBookCtrl', function(){
    var TblBookCtrl, TblBook, TblPublisher,  TblGenre, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// TblBook service
    	TblBook = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'tblBook1'});
    			return deferred.promise;
    		}
    	};
		
				TblPublisher = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				TblGenre = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				TblBookCtrl = $controller('TblBookCtrl', {
    		'TblBook': TblBook,
						'TblPublisher': TblPublisher,
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
    	expect($scope.tblBook).toBeNull();
    	expect($scope.tblBooks).toBe('tblBook1');
    	expect(Object.keys($scope.items).length).toBe(2);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshTblBookList', function() {
    	// given
    	TblBook.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'tblBook2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshTblBookList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.tblBooks).toBe('tblBook2');
    });
    
    it('refreshTblBook', function() {
    	// given
    	TblBook.get = function(bookid) {
			var deferred = $q.defer();
			deferred.resolve({data:'tblBook'+bookid});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshTblBook('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.tblBook).toBe('tblBook'+'1');
    });
    
	it('goToTblBookList', function() {
    	// given
    	spyOn($scope, "refreshTblBookList");
    	
    	// when
    	$scope.goToTblBookList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshTblBookList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/tblBook');
    });
    
    it('goToTblBook', function() {
    	// given
    	spyOn($scope, "refreshTblBook");
    	var bookid = 1;
    	
    	// when
    	$scope.goToTblBook(bookid);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshTblBook).toHaveBeenCalledWith(bookid);
    	expect($location.path).toHaveBeenCalledWith('/tblBook'+'/'+bookid);
    });
    
    it('save : create', function() {
    	// given
    	$scope.tblBook = {bookid:'1', name:'tblBook'};
    	
    	$scope.mode = 'create';
    	TblBook.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'tblBookSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.tblBook).toBe('tblBookSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.tblBook = {bookid:'1', name:'tblBook'};
    	
    	$scope.mode = 'update';
    	TblBook.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'tblBookSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.tblBook).toBe('tblBookSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	TblBook.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToTblBookList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToTblBookList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : tblBook create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/tblBook/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.tblBook).toBeNull();
    	expect($scope.tblBooks).toBe('tblBook1');
    	expect(Object.keys($scope.items).length).toBe(2);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});