'use strict';

/**
 * Factory for TblBookGenres
 */
tblBookGenresModule.factory('TblBookGenres', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage tblBookGenres
    var entityURL = restURL + '/tblBookGenres';
	
	/**
     * Validate tblBookGenres
     * @param tblBookGenres tblBookGenres
     * @throws validation exception
     */
	var validate = function (tblBookGenres) {
		var errors = [];
        if( tblBookGenres.genreId == null || tblBookGenres.genreId == '' ) {
			errors.push('tblBookGenres.id.not.defined');
		}
        if( tblBookGenres.bookid == null || tblBookGenres.bookid == '' ) {
			errors.push('tblBookGenres.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all tblBookGenress as list items
         * @return all tblBookGenress as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/tblBookGenres');
    	},

        /**
         * Get all tblBookGenress
         * @return all tblBookGenress
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get tblBookGenres
         * @param genreId genreId
         * @param bookid bookid
         * @return tblBookGenres
         */
    	get: function(genreId, bookid) {
    	    var url = entityURL + '/' + genreId + '/' + bookid;
        	return $http.get(url);
    	},

        /**
         * Create a new tblBookGenres
         * @param tblBookGenres tblBookGenres
         * @return tblBookGenres saved
         */
		create: function(tblBookGenres) {
			validate(tblBookGenres)
			var url = entityURL;
			return $http.post(url, tblBookGenres);
    	},

        /**
         * Update tblBookGenres
         * @param tblBookGenres tblBookGenres
         * @return tblBookGenres saved
         */
    	update: function(tblBookGenres) {
			validate(tblBookGenres)
			var url = entityURL + '/' + tblBookGenres.genreId + '/' + tblBookGenres.bookid;
			return $http.put(url, tblBookGenres);
    	},

		/**
         * Delete tblBookGenres
         * @param genreId genreId
         * @param bookid bookid
         */
    	delete: function(genreId, bookid) {
        	var url = entityURL + '/' + genreId + '/' + bookid;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

