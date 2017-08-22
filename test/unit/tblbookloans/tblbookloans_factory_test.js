'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('tblBookLoans.module'));
  
  describe('TblBookLoans', function(){
	var $httpBackend, TblBookLoans, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	TblBookLoans = $injector.get('TblBookLoans');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/tblBookLoans').respond("test");
    	TblBookLoans.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/tblBookLoans').respond("test");
    	TblBookLoans.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/tblBookLoans/1/2/3/4').respond("test");
    	TblBookLoans.get('1', '2', '3', '4').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		TblBookLoans.create({bookid:null, branchid:null, cardno:null, dateout:null,name:'tblBookLoans'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('tblBookLoans.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/tblBookLoans').respond("test");
    	TblBookLoans.create({bookid:'1', branchid:'2', cardno:'3', dateout:'4',name:'tblBookLoans'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		TblBookLoans.update({bookid:null, branchid:null, cardno:null, dateout:null,name:'tblBookLoans'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('tblBookLoans.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/tblBookLoans/1/2/3/4').respond("test");
    	TblBookLoans.update({bookid:'1', branchid:'2', cardno:'3', dateout:'4',name:'tblBookLoans'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/tblBookLoans/1/2/3/4').respond("test");
    	TblBookLoans.delete('1', '2', '3', '4').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});