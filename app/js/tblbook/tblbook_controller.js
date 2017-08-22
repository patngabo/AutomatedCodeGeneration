'use strict';

/**
 * Controller for TblBook
 **/
tblBookModule.controller('TblBookCtrl', ['TblBook',  'TblPublisher', 'TblGenre', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(TblBook, TblPublisher, TblGenre, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	 'TblPublisher',  'TblGenre',     // edition mode
    $scope.mode = null;
    
	// list of tblBooks
    $scope.tblBooks = [];
	// tblBook to edit
    $scope.tblBook = null;

	// referencies entities
	$scope.items = {};
    // tblPublishers
	$scope.items.tblPublishers = [];
    // tblGenres
	$scope.items.tblGenres = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		TblPublisher.getAllAsListItems().then(
				function(success) {
        	        $scope.items.tblPublishers = success.data;
            	}, 
	            MessageHandler.manageError);
		TblGenre.getAllAsListItems().then(
				function(success) {
        	        $scope.items.tblGenres = success.data;
            	}, 
	            MessageHandler.manageError);
    };
    
    /**
     * Refresh tblBooks list
     */
    $scope.refreshTblBookList = function() {
    	try {
			$scope.tblBooks = [];
        	TblBook.getAll().then(
				function(success) {
        	        $scope.tblBooks = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh tblBook
     */
    $scope.refreshTblBook = function(bookid) {
    	try {
        	$scope.tblBook = null;
	        TblBook.get(bookid).then(
				function(success) {
        	        $scope.tblBook = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the tblBooks list page
     */
    $scope.goToTblBookList = function() {
        $scope.refreshTblBookList();
        $location.path('/tblBook');
    }
    /**
     * Go to the tblBook edit page
     */
    $scope.goToTblBook = function(bookid) {
        $scope.refreshTblBook(bookid);
        $location.path('/tblBook/'+bookid);
    }

    // Actions

    /**
     * Save tblBook
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = TblBook.create;
			} else {
				save = TblBook.update;
			}
			save($scope.tblBook).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.tblBook = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete tblBook
     */
    $scope.delete = function(bookid) {
	    try {
			MessageHandler.cleanMessage();
    	    TblBook.delete(bookid).then(
				function(success) {
                	$scope.goToTblBookList();
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
        $scope.tblBook = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.bookid != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshTblBook($routeParams.bookid);
    } else {
        // List page
        $scope.refreshTblBookList();
    }
    
    
}]);
