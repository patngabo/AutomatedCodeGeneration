'use strict';

/**
 * Controller for TblAuthor
 **/
tblAuthorModule.controller('TblAuthorCtrl', ['TblAuthor',  'TblBook', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(TblAuthor, TblBook, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	 'TblBook',     // edition mode
    $scope.mode = null;
    
	// list of tblAuthors
    $scope.tblAuthors = [];
	// tblAuthor to edit
    $scope.tblAuthor = null;

	// referencies entities
	$scope.items = {};
    // tblBooks
	$scope.items.tblBooks = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		TblBook.getAllAsListItems().then(
				function(success) {
        	        $scope.items.tblBooks = success.data;
            	}, 
	            MessageHandler.manageError);
    };
    
    /**
     * Refresh tblAuthors list
     */
    $scope.refreshTblAuthorList = function() {
    	try {
			$scope.tblAuthors = [];
        	TblAuthor.getAll().then(
				function(success) {
        	        $scope.tblAuthors = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh tblAuthor
     */
    $scope.refreshTblAuthor = function(authorid) {
    	try {
        	$scope.tblAuthor = null;
	        TblAuthor.get(authorid).then(
				function(success) {
        	        $scope.tblAuthor = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the tblAuthors list page
     */
    $scope.goToTblAuthorList = function() {
        $scope.refreshTblAuthorList();
        $location.path('/tblAuthor');
    }
    /**
     * Go to the tblAuthor edit page
     */
    $scope.goToTblAuthor = function(authorid) {
        $scope.refreshTblAuthor(authorid);
        $location.path('/tblAuthor/'+authorid);
    }

    // Actions

    /**
     * Save tblAuthor
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = TblAuthor.create;
			} else {
				save = TblAuthor.update;
			}
			save($scope.tblAuthor).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.tblAuthor = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete tblAuthor
     */
    $scope.delete = function(authorid) {
	    try {
			MessageHandler.cleanMessage();
    	    TblAuthor.delete(authorid).then(
				function(success) {
                	$scope.goToTblAuthorList();
            	}, 
                MessageHandler.manageError);
        } catch(ex) {
            MessageHandler.manageException(ex);
        }
    };
    
    // Main
	MessageHandler.cleanMessage();
    if( $location.path().endsWith('/new') ) {
        // Creation page
        $scope.tblAuthor = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.authorid != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshTblAuthor($routeParams.authorid);
    } else {
        // List page
        $scope.refreshTblAuthorList();
    }
    
    
}]);
