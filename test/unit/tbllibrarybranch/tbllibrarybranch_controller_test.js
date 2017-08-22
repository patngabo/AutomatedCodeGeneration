'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('tblLibraryBranch.module'));
  
  describe('TblLibraryBranchCtrl', function(){
    var TblLibraryBranchCtrl, TblLibraryBranch,$rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// TblLibraryBranch service
    	TblLibraryBranch = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'tblLibraryBranch1'});
    			return deferred.promise;
    		}
    	};
		
				TblLibraryBranchCtrl = $controller('TblLibraryBranchCtrl', {
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
    	expect($scope.tblLibraryBranch).toBeNull();
    	expect($scope.tblLibraryBranchs).toBe('tblLibraryBranch1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshTblLibraryBranchList', function() {
    	// given
    	TblLibraryBranch.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'tblLibraryBranch2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshTblLibraryBranchList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.tblLibraryBranchs).toBe('tblLibraryBranch2');
    });
    
    it('refreshTblLibraryBranch', function() {
    	// given
    	TblLibraryBranch.get = function(branchid) {
			var deferred = $q.defer();
			deferred.resolve({data:'tblLibraryBranch'+branchid});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshTblLibraryBranch('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.tblLibraryBranch).toBe('tblLibraryBranch'+'1');
    });
    
	it('goToTblLibraryBranchList', function() {
    	// given
    	spyOn($scope, "refreshTblLibraryBranchList");
    	
    	// when
    	$scope.goToTblLibraryBranchList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshTblLibraryBranchList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/tblLibraryBranch');
    });
    
    it('goToTblLibraryBranch', function() {
    	// given
    	spyOn($scope, "refreshTblLibraryBranch");
    	var branchid = 1;
    	
    	// when
    	$scope.goToTblLibraryBranch(branchid);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshTblLibraryBranch).toHaveBeenCalledWith(branchid);
    	expect($location.path).toHaveBeenCalledWith('/tblLibraryBranch'+'/'+branchid);
    });
    
    it('save : create', function() {
    	// given
    	$scope.tblLibraryBranch = {branchid:'1', name:'tblLibraryBranch'};
    	
    	$scope.mode = 'create';
    	TblLibraryBranch.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'tblLibraryBranchSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.tblLibraryBranch).toBe('tblLibraryBranchSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.tblLibraryBranch = {branchid:'1', name:'tblLibraryBranch'};
    	
    	$scope.mode = 'update';
    	TblLibraryBranch.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'tblLibraryBranchSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.tblLibraryBranch).toBe('tblLibraryBranchSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	TblLibraryBranch.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToTblLibraryBranchList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToTblLibraryBranchList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : tblLibraryBranch create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/tblLibraryBranch/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.tblLibraryBranch).toBeNull();
    	expect($scope.tblLibraryBranchs).toBe('tblLibraryBranch1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});