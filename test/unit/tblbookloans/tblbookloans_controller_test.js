'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('tblBookLoans.module'));
  
  describe('TblBookLoansCtrl', function(){
    var TblBookLoansCtrl, TblBookLoans, TblBook,  TblLibraryBranch,  TblBorrower, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// TblBookLoans service
    	TblBookLoans = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'tblBookLoans1'});
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

				TblBorrower = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				TblBookLoansCtrl = $controller('TblBookLoansCtrl', {
    		'TblBookLoans': TblBookLoans,
						'TblBook': TblBook,
						'TblLibraryBranch': TblLibraryBranch,
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
    	expect($scope.tblBookLoans).toBeNull();
    	expect($scope.tblBookLoanss).toBe('tblBookLoans1');
    	expect(Object.keys($scope.items).length).toBe(3);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshTblBookLoansList', function() {
    	// given
    	TblBookLoans.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'tblBookLoans2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshTblBookLoansList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.tblBookLoanss).toBe('tblBookLoans2');
    });
    
    it('refreshTblBookLoans', function() {
    	// given
    	TblBookLoans.get = function(bookid, branchid, cardno, dateout) {
			var deferred = $q.defer();
			deferred.resolve({data:'tblBookLoans'+bookid+branchid+cardno+dateout});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshTblBookLoans('1', '2', '3', '4');
    	$scope.$apply();
    	
    	// then
    	expect($scope.tblBookLoans).toBe('tblBookLoans'+'1'+'2'+'3'+'4');
    });
    
	it('goToTblBookLoansList', function() {
    	// given
    	spyOn($scope, "refreshTblBookLoansList");
    	
    	// when
    	$scope.goToTblBookLoansList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshTblBookLoansList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/tblBookLoans');
    });
    
    it('goToTblBookLoans', function() {
    	// given
    	spyOn($scope, "refreshTblBookLoans");
    	var bookid = 1;
    	var branchid = 2;
    	var cardno = 3;
    	var dateout = 4;
    	
    	// when
    	$scope.goToTblBookLoans(bookid, branchid, cardno, dateout);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshTblBookLoans).toHaveBeenCalledWith(bookid, branchid, cardno, dateout);
    	expect($location.path).toHaveBeenCalledWith('/tblBookLoans'+'/'+bookid+'/'+branchid+'/'+cardno+'/'+dateout);
    });
    
    it('save : create', function() {
    	// given
    	$scope.tblBookLoans = {bookid:'1', branchid:'2', cardno:'3', dateout:'4', name:'tblBookLoans'};
    	
    	$scope.mode = 'create';
    	TblBookLoans.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'tblBookLoansSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.tblBookLoans).toBe('tblBookLoansSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.tblBookLoans = {bookid:'1', branchid:'2', cardno:'3', dateout:'4', name:'tblBookLoans'};
    	
    	$scope.mode = 'update';
    	TblBookLoans.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'tblBookLoansSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.tblBookLoans).toBe('tblBookLoansSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	TblBookLoans.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToTblBookLoansList");
    	
    	// when
    	$scope.delete('1', '2', '3', '4');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToTblBookLoansList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : tblBookLoans create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/tblBookLoans/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.tblBookLoans).toBeNull();
    	expect($scope.tblBookLoanss).toBe('tblBookLoans1');
    	expect(Object.keys($scope.items).length).toBe(3);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});