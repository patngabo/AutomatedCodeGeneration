'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('tblGenre.module'));
  
  describe('TblGenre', function(){
	var $httpBackend, TblGenre, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	TblGenre = $injector.get('TblGenre');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/tblGenre').respond("test");
    	TblGenre.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/tblGenre').respond("test");
    	TblGenre.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/tblGenre/1').respond("test");
    	TblGenre.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		TblGenre.create({genreId:null,name:'tblGenre'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('tblGenre.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/tblGenre').respond("test");
    	TblGenre.create({genreId:'1',name:'tblGenre'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		TblGenre.update({genreId:null,name:'tblGenre'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('tblGenre.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/tblGenre/1').respond("test");
    	TblGenre.update({genreId:'1',name:'tblGenre'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/tblGenre/1').respond("test");
    	TblGenre.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});