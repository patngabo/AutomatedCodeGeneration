'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('tblLibraryBranch.module'));
  
  describe('TblLibraryBranch', function(){
	var $httpBackend, TblLibraryBranch, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	TblLibraryBranch = $injector.get('TblLibraryBranch');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/tblLibraryBranch').respond("test");
    	TblLibraryBranch.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/tblLibraryBranch').respond("test");
    	TblLibraryBranch.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/tblLibraryBranch/1').respond("test");
    	TblLibraryBranch.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		TblLibraryBranch.create({branchid:null,name:'tblLibraryBranch'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('tblLibraryBranch.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/tblLibraryBranch').respond("test");
    	TblLibraryBranch.create({branchid:'1',name:'tblLibraryBranch'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		TblLibraryBranch.update({branchid:null,name:'tblLibraryBranch'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('tblLibraryBranch.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/tblLibraryBranch/1').respond("test");
    	TblLibraryBranch.update({branchid:'1',name:'tblLibraryBranch'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/tblLibraryBranch/1').respond("test");
    	TblLibraryBranch.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});