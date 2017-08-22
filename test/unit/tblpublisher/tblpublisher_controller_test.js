'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('tblPublisher.module'));
  
  describe('TblPublisherCtrl', function(){
    var TblPublisherCtrl, TblPublisher,$rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// TblPublisher service
    	TblPublisher = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'tblPublisher1'});
    			return deferred.promise;
    		}
    	};
		
				TblPublisherCtrl = $controller('TblPublisherCtrl', {
    		'TblPublisher': TblPublisher,
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
    	expect($scope.tblPublisher).toBeNull();
    	expect($scope.tblPublishers).toBe('tblPublisher1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshTblPublisherList', function() {
    	// given
    	TblPublisher.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'tblPublisher2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshTblPublisherList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.tblPublishers).toBe('tblPublisher2');
    });
    
    it('refreshTblPublisher', function() {
    	// given
    	TblPublisher.get = function(publisherid) {
			var deferred = $q.defer();
			deferred.resolve({data:'tblPublisher'+publisherid});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshTblPublisher('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.tblPublisher).toBe('tblPublisher'+'1');
    });
    
	it('goToTblPublisherList', function() {
    	// given
    	spyOn($scope, "refreshTblPublisherList");
    	
    	// when
    	$scope.goToTblPublisherList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshTblPublisherList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/tblPublisher');
    });
    
    it('goToTblPublisher', function() {
    	// given
    	spyOn($scope, "refreshTblPublisher");
    	var publisherid = 1;
    	
    	// when
    	$scope.goToTblPublisher(publisherid);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshTblPublisher).toHaveBeenCalledWith(publisherid);
    	expect($location.path).toHaveBeenCalledWith('/tblPublisher'+'/'+publisherid);
    });
    
    it('save : create', function() {
    	// given
    	$scope.tblPublisher = {publisherid:'1', name:'tblPublisher'};
    	
    	$scope.mode = 'create';
    	TblPublisher.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'tblPublisherSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.tblPublisher).toBe('tblPublisherSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.tblPublisher = {publisherid:'1', name:'tblPublisher'};
    	
    	$scope.mode = 'update';
    	TblPublisher.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'tblPublisherSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.tblPublisher).toBe('tblPublisherSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	TblPublisher.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToTblPublisherList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToTblPublisherList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : tblPublisher create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/tblPublisher/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.tblPublisher).toBeNull();
    	expect($scope.tblPublishers).toBe('tblPublisher1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});