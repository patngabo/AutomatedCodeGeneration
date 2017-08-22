'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('tblBook.module'));
  
  describe('TblBook', function(){
	var $httpBackend, TblBook, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	TblBook = $injector.get('TblBook');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/tblBook').respond("test");
    	TblBook.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/tblBook').respond("test");
    	TblBook.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/tblBook/1').respond("test");
    	TblBook.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		TblBook.create({bookid:null,name:'tblBook'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('tblBook.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/tblBook').respond("test");
    	TblBook.create({bookid:'1',name:'tblBook'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		TblBook.update({bookid:null,name:'tblBook'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('tblBook.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/tblBook/1').respond("test");
    	TblBook.update({bookid:'1',name:'tblBook'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/tblBook/1').respond("test");
    	TblBook.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});