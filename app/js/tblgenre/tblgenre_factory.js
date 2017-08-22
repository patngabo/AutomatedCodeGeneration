'use strict';

/**
 * Factory for TblGenre
 */
tblGenreModule.factory('TblGenre', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage tblGenre
    var entityURL = restURL + '/tblGenre';
	
	/**
     * Validate tblGenre
     * @param tblGenre tblGenre
     * @throws validation exception
     */
	var validate = function (tblGenre) {
		var errors = [];
        if( tblGenre.genreId == null || tblGenre.genreId == '' ) {
			errors.push('tblGenre.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all tblGenres as list items
         * @return all tblGenres as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/tblGenre');
    	},

        /**
         * Get all tblGenres
         * @return all tblGenres
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get tblGenre
         * @param genreId genreId
         * @return tblGenre
         */
    	get: function(genreId) {
    	    var url = entityURL + '/' + genreId;
        	return $http.get(url);
    	},

        /**
         * Create a new tblGenre
         * @param tblGenre tblGenre
         * @return tblGenre saved
         */
		create: function(tblGenre) {
			validate(tblGenre)
			var url = entityURL;
			return $http.post(url, tblGenre);
    	},

        /**
         * Update tblGenre
         * @param tblGenre tblGenre
         * @return tblGenre saved
         */
    	update: function(tblGenre) {
			validate(tblGenre)
			var url = entityURL + '/' + tblGenre.genreId;
			return $http.put(url, tblGenre);
    	},

		/**
         * Delete tblGenre
         * @param genreId genreId
         */
    	delete: function(genreId) {
        	var url = entityURL + '/' + genreId;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

