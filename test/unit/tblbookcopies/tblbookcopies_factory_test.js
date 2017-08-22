'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('tblBookCopies.module'));
  
  describe('TblBookCopies', function(){
	var $httpBackend, TblBookCopies, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	TblBookCopies = $injector.get('TblBookCopies');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/tblBookCopies').respond("test");
    	TblBookCopies.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/tblBookCopies').respond("test");
    	TblBookCopies.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/tblBookCopies/1/2').respond("test");
    	TblBookCopies.get('1', '2').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		TblBookCopies.create({bookid:null, branchid:null,name:'tblBookCopies'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('tblBookCopies.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/tblBookCopies').respond("test");
    	TblBookCopies.create({bookid:'1', branchid:'2',name:'tblBookCopies'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		TblBookCopies.update({bookid:null, branchid:null,name:'tblBookCopies'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('tblBookCopies.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/tblBookCopies/1/2').respond("test");
    	TblBookCopies.update({bookid:'1', branchid:'2',name:'tblBookCopies'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/tblBookCopies/1/2').respond("test");
    	TblBookCopies.delete('1', '2').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});