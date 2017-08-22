'use strict';

/**
 * Factory for TblBookAuthors
 */
tblBookAuthorsModule.factory('TblBookAuthors', ['$http', 'restURL', function($http, restURL) {

	// REST Service URL to manage tblBookAuthors
    var entityURL = restURL + '/tblBookAuthors';
	
	/**
     * Validate tblBookAuthors
     * @param tblBookAuthors tblBookAuthors
     * @throws validation exception
     */
	var validate = function (tblBookAuthors) {
		var errors = [];
        if( tblBookAuthors.bookid == null || tblBookAuthors.bookid == '' ) {
			errors.push('tblBookAuthors.id.not.defined');
		}
        if( tblBookAuthors.authorid == null || tblBookAuthors.authorid == '' ) {
			errors.push('tblBookAuthors.id.not.defined');
		}
		if(errors.length > 0) {
			throw errors;
		}
    };
	
	return {
        /**
         * Get all tblBookAuthorss as list items
         * @return all tblBookAuthorss as list items
         */
    	getAllAsListItems: function() {
        	return $http.get(restURL + '/items/tblBookAuthors');
    	},

        /**
         * Get all tblBookAuthorss
         * @return all tblBookAuthorss
         */
    	getAll: function() {
        	return $http.get(entityURL);
    	},

        /**
         * Get tblBookAuthors
         * @param bookid bookid
         * @param authorid authorid
         * @return tblBookAuthors
         */
    	get: function(bookid, authorid) {
    	    var url = entityURL + '/' + bookid + '/' + authorid;
        	return $http.get(url);
    	},

        /**
         * Create a new tblBookAuthors
         * @param tblBookAuthors tblBookAuthors
         * @return tblBookAuthors saved
         */
		create: function(tblBookAuthors) {
			validate(tblBookAuthors)
			var url = entityURL;
			return $http.post(url, tblBookAuthors);
    	},

        /**
         * Update tblBookAuthors
         * @param tblBookAuthors tblBookAuthors
         * @return tblBookAuthors saved
         */
    	update: function(tblBookAuthors) {
			validate(tblBookAuthors)
			var url = entityURL + '/' + tblBookAuthors.bookid + '/' + tblBookAuthors.authorid;
			return $http.put(url, tblBookAuthors);
    	},

		/**
         * Delete tblBookAuthors
         * @param bookid bookid
         * @param authorid authorid
         */
    	delete: function(bookid, authorid) {
        	var url = entityURL + '/' + bookid + '/' + authorid;
        	return $http.delete(url);
    	}
	};
	return $this;
}]);

