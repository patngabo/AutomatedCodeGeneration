'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('tblBookAuthors.module'));
  
  describe('TblBookAuthors', function(){
	var $httpBackend, TblBookAuthors, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	TblBookAuthors = $injector.get('TblBookAuthors');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/tblBookAuthors').respond("test");
    	TblBookAuthors.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/tblBookAuthors').respond("test");
    	TblBookAuthors.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/tblBookAuthors/1/2').respond("test");
    	TblBookAuthors.get('1', '2').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		TblBookAuthors.create({bookid:null, authorid:null,name:'tblBookAuthors'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('tblBookAuthors.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/tblBookAuthors').respond("test");
    	TblBookAuthors.create({bookid:'1', authorid:'2',name:'tblBookAuthors'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		TblBookAuthors.update({bookid:null, authorid:null,name:'tblBookAuthors'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('tblBookAuthors.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/tblBookAuthors/1/2').respond("test");
    	TblBookAuthors.update({bookid:'1', authorid:'2',name:'tblBookAuthors'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/tblBookAuthors/1/2').respond("test");
    	TblBookAuthors.delete('1', '2').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});