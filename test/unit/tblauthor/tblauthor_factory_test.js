'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('tblAuthor.module'));
  
  describe('TblAuthor', function(){
	var $httpBackend, TblAuthor, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	TblAuthor = $injector.get('TblAuthor');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/tblAuthor').respond("test");
    	TblAuthor.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/tblAuthor').respond("test");
    	TblAuthor.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/tblAuthor/1').respond("test");
    	TblAuthor.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		TblAuthor.create({authorid:null,name:'tblAuthor'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('tblAuthor.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/tblAuthor').respond("test");
    	TblAuthor.create({authorid:'1',name:'tblAuthor'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		TblAuthor.update({authorid:null,name:'tblAuthor'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('tblAuthor.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/tblAuthor/1').respond("test");
    	TblAuthor.update({authorid:'1',name:'tblAuthor'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/tblAuthor/1').respond("test");
    	TblAuthor.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});