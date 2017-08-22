'use strict';

/**
 * Controller for TblGenre
 **/
tblGenreModule.controller('TblGenreCtrl', ['TblGenre',  '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURL', function(TblGenre, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURL) {
	    // edition mode
    $scope.mode = null;
    
	// list of tblGenres
    $scope.tblGenres = [];
	// tblGenre to edit
    $scope.tblGenre = null;

	// referencies entities
	$scope.items = {};

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
    };
    
    /**
     * Refresh tblGenres list
     */
    $scope.refreshTblGenreList = function() {
    	try {
			$scope.tblGenres = [];
        	TblGenre.getAll().then(
				function(success) {
        	        $scope.tblGenres = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh tblGenre
     */
    $scope.refreshTblGenre = function(genreId) {
    	try {
        	$scope.tblGenre = null;
	        TblGenre.get(genreId).then(
				function(success) {
        	        $scope.tblGenre = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the tblGenres list page
     */
    $scope.goToTblGenreList = function() {
        $scope.refreshTblGenreList();
        $location.path('/tblGenre');
    }
    /**
     * Go to the tblGenre edit page
     */
    $scope.goToTblGenre = function(genreId) {
        $scope.refreshTblGenre(genreId);
        $location.path('/tblGenre/'+genreId);
    }

    // Actions

    /**
     * Save tblGenre
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = TblGenre.create;
			} else {
				save = TblGenre.update;
			}
			save($scope.tblGenre).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.tblGenre = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete tblGenre
     */
    $scope.delete = function(genreId) {
	    try {
			MessageHandler.cleanMessage();
    	    TblGenre.delete(genreId).then(
				function(success) {
                	$scope.goToTblGenreList();
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
        $scope.tblGenre = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.genreId != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshTblGenre($routeParams.genreId);
    } else {
        // List page
        $scope.refreshTblGenreList();
    }
    
    
}]);
