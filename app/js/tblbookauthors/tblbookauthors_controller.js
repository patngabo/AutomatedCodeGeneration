'use strict';

/**
 * Controller for TblBookAuthors
 **/
tblBookAuthorsModule.controller('TblBookAuthorsCtrl', ['TblBookAuthors',  '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(TblBookAuthors, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	    // edition mode
    $scope.mode = null;
    
	// list of tblBookAuthorss
    $scope.tblBookAuthorss = [];
	// tblBookAuthors to edit
    $scope.tblBookAuthors = null;

	// referencies entities
	$scope.items = {};

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
    };
    
    /**
     * Refresh tblBookAuthorss list
     */
    $scope.refreshTblBookAuthorsList = function() {
    	try {
			$scope.tblBookAuthorss = [];
        	TblBookAuthors.getAll().then(
				function(success) {
        	        $scope.tblBookAuthorss = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh tblBookAuthors
     */
    $scope.refreshTblBookAuthors = function(bookid, authorid) {
    	try {
        	$scope.tblBookAuthors = null;
	        TblBookAuthors.get(bookid, authorid).then(
				function(success) {
        	        $scope.tblBookAuthors = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the tblBookAuthorss list page
     */
    $scope.goToTblBookAuthorsList = function() {
        $scope.refreshTblBookAuthorsList();
        $location.path('/tblBookAuthors');
    }
    /**
     * Go to the tblBookAuthors edit page
     */
    $scope.goToTblBookAuthors = function(bookid, authorid) {
        $scope.refreshTblBookAuthors(bookid, authorid);
        $location.path('/tblBookAuthors/'+bookid+'/'+authorid);
    }

    // Actions

    /**
     * Save tblBookAuthors
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = TblBookAuthors.create;
			} else {
				save = TblBookAuthors.update;
			}
			save($scope.tblBookAuthors).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.tblBookAuthors = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete tblBookAuthors
     */
    $scope.delete = function(bookid, authorid) {
	    try {
			MessageHandler.cleanMessage();
    	    TblBookAuthors.delete(bookid, authorid).then(
				function(success) {
                	$scope.goToTblBookAuthorsList();
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
        $scope.tblBookAuthors = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.bookid != null && $routeParams.authorid != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshTblBookAuthors($routeParams.bookid, $routeParams.authorid);
    } else {
        // List page
        $scope.refreshTblBookAuthorsList();
    }
    
    
}]);
