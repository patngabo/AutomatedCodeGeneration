'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('tblBorrower.module'));
  
  describe('TblBorrowerCtrl', function(){
    var TblBorrowerCtrl, TblBorrower,$rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// TblBorrower service
    	TblBorrower = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'tblBorrower1'});
    			return deferred.promise;
    		}
    	};
		
				TblBorrowerCtrl = $controller('TblBorrowerCtrl', {
    		'TblBorrower': TblBorrower,
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
    	expect($scope.tblBorrower).toBeNull();
    	expect($scope.tblBorrowers).toBe('tblBorrower1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshTblBorrowerList', function() {
    	// given
    	TblBorrower.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'tblBorrower2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshTblBorrowerList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.tblBorrowers).toBe('tblBorrower2');
    });
    
    it('refreshTblBorrower', function() {
    	// given
    	TblBorrower.get = function(cardno) {
			var deferred = $q.defer();
			deferred.resolve({data:'tblBorrower'+cardno});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshTblBorrower('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.tblBorrower).toBe('tblBorrower'+'1');
    });
    
	it('goToTblBorrowerList', function() {
    	// given
    	spyOn($scope, "refreshTblBorrowerList");
    	
    	// when
    	$scope.goToTblBorrowerList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshTblBorrowerList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/tblBorrower');
    });
    
    it('goToTblBorrower', function() {
    	// given
    	spyOn($scope, "refreshTblBorrower");
    	var cardno = 1;
    	
    	// when
    	$scope.goToTblBorrower(cardno);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshTblBorrower).toHaveBeenCalledWith(cardno);
    	expect($location.path).toHaveBeenCalledWith('/tblBorrower'+'/'+cardno);
    });
    
    it('save : create', function() {
    	// given
    	$scope.tblBorrower = {cardno:'1', name:'tblBorrower'};
    	
    	$scope.mode = 'create';
    	TblBorrower.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'tblBorrowerSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.tblBorrower).toBe('tblBorrowerSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.tblBorrower = {cardno:'1', name:'tblBorrower'};
    	
    	$scope.mode = 'update';
    	TblBorrower.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'tblBorrowerSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.tblBorrower).toBe('tblBorrowerSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	TblBorrower.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToTblBorrowerList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToTblBorrowerList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : tblBorrower create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/tblBorrower/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.tblBorrower).toBeNull();
    	expect($scope.tblBorrowers).toBe('tblBorrower1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});