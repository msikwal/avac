'use strict';
/*jshint jquery:true*/
/**
 * @ngdoc function
 * @name avacDetailsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the avacDetailsApp
 */
angular.module('avacDetailsv1App')
  .controller('MenuCtrl', function ($scope,$rootScope,$location) {
	  $rootScope.menuArr = [
            {
	     	   	'pageName':'Login',
	     	   	'pageLink':'login'
    		},
       		{
        	   	'pageName':'Vaccination Chart',
        	   	'pageLink':'vacchart'
    	    }
      ];
	  $scope.getClass = function(path) {
		    if ($location.path().substr(0, path.length) == path) {
		      return "active"
		    } else {
		      return ""
		    }
		};
});
