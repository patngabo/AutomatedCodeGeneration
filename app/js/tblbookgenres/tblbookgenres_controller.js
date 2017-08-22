'use strict';

/**
 * Controller for TblBookGenres
 **/
tblBookGenresModule.controller('TblBookGenresCtrl', ['TblBookGenres',  '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(TblBookGenres, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	    // edition mode
    $scope.mode = null;
    
	// list of tblBookGenress
    $scope.tblBookGenress = [];
	// tblBookGenres to edit
    $scope.tblBookGenres = null;

	// referencies entities
	$scope.items = {};

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
    };
    
    /**
     * Refresh tblBookGenress list
     */
    $scope.refreshTblBookGenresList = function() {
    	try {
			$scope.tblBookGenress = [];
        	TblBookGenres.getAll().then(
				function(success) {
        	        $scope.tblBookGenress = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh tblBookGenres
     */
    $scope.refreshTblBookGenres = function(genreId, bookid) {
    	try {
        	$scope.tblBookGenres = null;
	        TblBookGenres.get(genreId, bookid).then(
				function(success) {
        	        $scope.tblBookGenres = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the tblBookGenress list page
     */
    $scope.goToTblBookGenresList = function() {
        $scope.refreshTblBookGenresList();
        $location.path('/tblBookGenres');
    }
    /**
     * Go to the tblBookGenres edit page
     */
    $scope.goToTblBookGenres = function(genreId, bookid) {
        $scope.refreshTblBookGenres(genreId, bookid);
        $location.path('/tblBookGenres/'+genreId+'/'+bookid);
    }

    // Actions

    /**
     * Save tblBookGenres
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = TblBookGenres.create;
			} else {
				save = TblBookGenres.update;
			}
			save($scope.tblBookGenres).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.tblBookGenres = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete tblBookGenres
     */
    $scope.delete = function(genreId, bookid) {
	    try {
			MessageHandler.cleanMessage();
    	    TblBookGenres.delete(genreId, bookid).then(
				function(success) {
                	$scope.goToTblBookGenresList();
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
        $scope.tblBookGenres = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.genreId != null && $routeParams.bookid != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshTblBookGenres($routeParams.genreId, $routeParams.bookid);
    } else {
        // List page
        $scope.refreshTblBookGenresList();
    }
    
    
}]);
