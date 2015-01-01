'use strict';

/**
 * @ngdoc overview
 * @name avacDetailsv1App
 * @description
 * # avacDetailsv1App
 *
 * Main module of the application.
 */
var app = angular.module('avacDetailsv1App', [
                                              'ngAnimate',
                                              'ngCookies',
                                              'ngMessages',
                                              'ngResource',
                                              'ngRoute',
                                              'ngSanitize',
                                              'ngTouch',
                                              'vacService',
                                              'formatterService',
                                              'stateService'
                                              ]);

app.config(function ($routeProvider) {
	$routeProvider
	.when('/whyvac', {
		templateUrl: 'views/why_vaccinate.html',
		access: { requiredAuthentication: false }
	})
	.when('/vacchart', {
		templateUrl: 'views/vac_chart.html',
		controller: 'VacChartCtrl',
		access: { requiredAuthentication: false }
	})
	.when('/doctor', {
		templateUrl: 'views/doctor.html',
		controller: 'DoctorCtrl',
		access: { requiredAuthentication: true }
	})
	.when('/register', {
		templateUrl: 'views/register.html',
		controller: 'RegisterCtrl'
	})
	.when('/child', {
		templateUrl: 'views/child_vac.html',
		controller: 'ChildCtrl',
		access: { requiredAuthentication: true }
	})
	.when('/vac', {
		templateUrl: 'views/vac_details.html',
		controller: 'VacCtrl',
		access: { requiredAuthentication: true }
	})
	.when('/user', {
		templateUrl: 'views/user.html',
		controller: 'UserCtrl',
		access: { requiredAuthentication: true }
	})
	.when('/login', {
		templateUrl: 'views/login.html',
		controller: 'LoginCtrl'
	})
	.when('/logout', {
		templateUrl: 'views/login.html',
		controller: 'LoginOutCtrl'
	})
	.when('/dashboard', {
		templateUrl: 'views/dashboard.html',
		controller: 'DashboardCtrl',
		access: { requiredAuthentication: true }
	})
	.when('/child-vac-details', {
		templateUrl: 'views/vac_details.html',
		controller: 'VacDetailsCtrl'
	})
	.when('/pre-details', {
		templateUrl: 'views/pregnancy.html',
		controller: 'VacPreCtrl',
		access: { requiredAuthentication: true }
	})
	.when('/health-details', {
		templateUrl: 'views/healthcheckup.html',
		controller: 'VacHealthCtrl',
		access: { requiredAuthentication: true }
	})
	.when('/user-reports', {
		templateUrl: 'views/user-subscription.html',
		controller: 'UserReportDetailsCtrl'
	})
	.otherwise({
		redirectTo: '/'
	});
});
app.run(function($rootScope, $location, $window) {
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
    	    if (nextRoute != null && nextRoute.access != null && nextRoute.access.requiredAuthentication && !window.mstarUtil.isSignedIn) {
    	            $location.path("/login");
    	    }else if(nextRoute.templateUrl==='views/doctor.html'){
    	    	
    	    }else if(nextRoute.templateUrl==='views/user.html'){
    	    			
    	    }
    });
});
function showPopup(msg){
	$(".modal-body").html(msg);
	$(".js-modal").openModal();
}
function isObject(obj) {
    return obj === Object(obj);
};
(function () {
	$('.button-collapse').sideNav({menuWidth: 240, activationWidth: 70});
	window.mstarUtil = {
		/* session state and premium state access info */
		isSignedIn: function () {
			var storage = this.loadLocalStorage();
			var token = storage.login.token;
			var signedIn = (typeof token === 'string' && token.length > 0);
			return signedIn;
		},

		/*  loadLocalStorage returns information needed to persist across the app
	     if any of the top-level properties are not found in local storage, the function will
	     instantiate them to a default value */
		loadLocalStorage: function () {
			var appStorage = localStorage.getItem('alertme-app');

			/*  if local storage obj exists, and is valid JSON, parse string into an object
	       try/catch is used since JSON.parse will throw an error if string is not valid JSON */
			if (appStorage) {
				try {
					appStorage = JSON.parse(appStorage);

					/*  else make a new object */
				} catch (e) {
					appStorage = {};
				}
			} else {
				appStorage = {};
			}

			/*  if app storage is missing articles, videos, quotes, login or fontSize, set properites to a default value */

			if (typeof appStorage.login !== 'object') {
				appStorage.login = {
						country: null,
						userId: null,
						email: null,
						locale: 'en-US',
						isPremium: false,
						userRole: null,
						token: null
				};
			}
			if (typeof appStorage.rememberMe !== 'boolean') {
				appStorage.rememberMe = true;
			}
			if (typeof appStorage.rememberEmail !== 'string') {
				appStorage.rememberEmail = null;
			}

			return appStorage;
		},
		/*  saveLocalStorage takes an object, turns it into a JSON string, then saves it in local storage */
		saveLocalStorage: function (storageObj) {
			var objString = JSON.stringify(storageObj),
			ret = false;

			if (isObject(storageObj)) {
				localStorage.setItem('alertme-app', objString);
				ret = true;
			}

			return ret;
		}
	};

})();