'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('tblBookCopies.module'));
  
  describe('TblBookCopiesCtrl', function(){
    var TblBookCopiesCtrl, TblBookCopies, TblBook,  TblLibraryBranch, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// TblBookCopies service
    	TblBookCopies = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'tblBookCopies1'});
    			return deferred.promise;
    		}
    	};
		
				TblBook = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				TblLibraryBranch = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				TblBookCopiesCtrl = $controller('TblBookCopiesCtrl', {
    		'TblBookCopies': TblBookCopies,
						'TblBook': TblBook,
						'TblLibraryBranch': TblLibraryBranch,
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
    	expect($scope.tblBookCopies).toBeNull();
    	expect($scope.tblBookCopiess).toBe('tblBookCopies1');
    	expect(Object.keys($scope.items).length).toBe(2);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshTblBookCopiesList', function() {
    	// given
    	TblBookCopies.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'tblBookCopies2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshTblBookCopiesList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.tblBookCopiess).toBe('tblBookCopies2');
    });
    
    it('refreshTblBookCopies', function() {
    	// given
    	TblBookCopies.get = function(bookid, branchid) {
			var deferred = $q.defer();
			deferred.resolve({data:'tblBookCopies'+bookid+branchid});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshTblBookCopies('1', '2');
    	$scope.$apply();
    	
    	// then
    	expect($scope.tblBookCopies).toBe('tblBookCopies'+'1'+'2');
    });
    
	it('goToTblBookCopiesList', function() {
    	// given
    	spyOn($scope, "refreshTblBookCopiesList");
    	
    	// when
    	$scope.goToTblBookCopiesList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshTblBookCopiesList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/tblBookCopies');
    });
    
    it('goToTblBookCopies', function() {
    	// given
    	spyOn($scope, "refreshTblBookCopies");
    	var bookid = 1;
    	var branchid = 2;
    	
    	// when
    	$scope.goToTblBookCopies(bookid, branchid);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshTblBookCopies).toHaveBeenCalledWith(bookid, branchid);
    	expect($location.path).toHaveBeenCalledWith('/tblBookCopies'+'/'+bookid+'/'+branchid);
    });
    
    it('save : create', function() {
    	// given
    	$scope.tblBookCopies = {bookid:'1', branchid:'2', name:'tblBookCopies'};
    	
    	$scope.mode = 'create';
    	TblBookCopies.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'tblBookCopiesSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.tblBookCopies).toBe('tblBookCopiesSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.tblBookCopies = {bookid:'1', branchid:'2', name:'tblBookCopies'};
    	
    	$scope.mode = 'update';
    	TblBookCopies.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'tblBookCopiesSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.tblBookCopies).toBe('tblBookCopiesSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	TblBookCopies.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToTblBookCopiesList");
    	
    	// when
    	$scope.delete('1', '2');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToTblBookCopiesList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : tblBookCopies create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/tblBookCopies/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.tblBookCopies).toBeNull();
    	expect($scope.tblBookCopiess).toBe('tblBookCopies1');
    	expect(Object.keys($scope.items).length).toBe(2);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});