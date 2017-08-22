'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('tblPublisher.module'));
  
  describe('TblPublisher', function(){
	var $httpBackend, TblPublisher, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	TblPublisher = $injector.get('TblPublisher');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/tblPublisher').respond("test");
    	TblPublisher.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/tblPublisher').respond("test");
    	TblPublisher.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/tblPublisher/1').respond("test");
    	TblPublisher.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		TblPublisher.create({publisherid:null,name:'tblPublisher'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('tblPublisher.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/tblPublisher').respond("test");
    	TblPublisher.create({publisherid:'1',name:'tblPublisher'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		TblPublisher.update({publisherid:null,name:'tblPublisher'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('tblPublisher.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/tblPublisher/1').respond("test");
    	TblPublisher.update({publisherid:'1',name:'tblPublisher'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/tblPublisher/1').respond("test");
    	TblPublisher.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});