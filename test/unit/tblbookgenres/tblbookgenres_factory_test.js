'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('tblBookGenres.module'));
  
  describe('TblBookGenres', function(){
	var $httpBackend, TblBookGenres, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	TblBookGenres = $injector.get('TblBookGenres');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/tblBookGenres').respond("test");
    	TblBookGenres.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/tblBookGenres').respond("test");
    	TblBookGenres.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/tblBookGenres/1/2').respond("test");
    	TblBookGenres.get('1', '2').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		TblBookGenres.create({genreId:null, bookid:null,name:'tblBookGenres'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('tblBookGenres.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/tblBookGenres').respond("test");
    	TblBookGenres.create({genreId:'1', bookid:'2',name:'tblBookGenres'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		TblBookGenres.update({genreId:null, bookid:null,name:'tblBookGenres'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('tblBookGenres.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/tblBookGenres/1/2').respond("test");
    	TblBookGenres.update({genreId:'1', bookid:'2',name:'tblBookGenres'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/tblBookGenres/1/2').respond("test");
    	TblBookGenres.delete('1', '2').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});