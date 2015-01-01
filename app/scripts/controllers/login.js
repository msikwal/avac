'use strict';
/*jshint jquery:true*/
/**
 * @ngdoc function
 * @name avacDetailsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the avacDetailsApp
 */
angular.module('avacDetailsv1App')
.controller('LoginCtrl', function ($scope,VacService,Session,$location,$cookies,StateService,$rootScope) {
	$scope.invalidDetails =false;
	var handleSuccessCall = function (rowdata){
		var userRole;
		var token = new Date().getTime() * rowdata.status * 100;
		if(rowdata.status==1){
			userRole = 'doctor';
			$location.path('/doctor');
		}else if(rowdata.status ==2){
			userRole = 'reguser';
			$location.path('/user');
		}else{
			$scope.invalidDetails = true;
			showPopup("Invalid Credentials!");
			return false;
		}
		StateService.setUserId($scope.master.mobile_num);
		StateService.setToken(token);
		StateService.setUserRole(userRole);
		Session.create(token,$scope.master.mobile_num,userRole);
		renderMenu(rowdata);
	};
	var renderMenu = function (rowdata){
		var menuArrEle = [];
		if(rowdata.status==1){
			menuArrEle = [
             	{
      	     	   	'pageName':'Profile',
      	     	   	'pageLink':'doctor'
          		},
             		{
              	   	'pageName':'Child Vaccination',
              	   	'pageLink':'child'
          	    },
          	    {
              	   	'pageName':'Pregnancy',
              	   	'pageLink':'pre-details'
          	    },
          	    {
              	   	'pageName':'Appointments',
              	   	'pageLink':'health-details'
          	    },
          	    {
              	   	'pageName':'Logout',
              	   	'pageLink':'logout'
          	    }
            ];
		}else if(rowdata.status ==2){
			menuArrEle = [
             	{
      	     	   	'pageName':'Profile',
      	     	   	'pageLink':'user'
          		},
             		{
              	   	'pageName':'Vaccination Info',
              	   	'pageLink':'child-vac-details'
          	    }
          	];	
		}
		$rootScope.menuArr = menuArrEle;
	};
	var handleFailCall = function (rowdata){
		showPopup("Please try after sometime!!");
	};
	
	$scope.master = {};
    $scope.login = function(user) {
      $scope.master = angular.copy(user);
      VacService.userLogin({ 
			success: handleSuccessCall,
			fail : handleFailCall,
			action : 'login',
			data : $scope.master,
			method : 'POST'
	  });
    };

    $scope.reset = function() {
      $scope.user = angular.copy($scope.master);
    };

    $scope.isUnchanged = function(user) {
      return angular.equals(user, $scope.master);
    };
    $scope.reset();
    if($cookies.user_mobile){
    	$('#remember').attr('checked',true);
    	$scope.user.mobile_num = $cookies.user_mobile;
    };
    $scope.checkRememberMe = function(){
        if($('#remember').is(":checked")){
        	var user_mobile_no = $("#mobileNum").val();
        	if(user_mobile_no){
        		 $cookies.user_mobile = user_mobile_no;
        	}
        }else{
        	$cookies.user_mobile = "";
        }
    };
})
.controller('LoginOutCtrl', function ($scope,VacService,Session,$location,$rootScope) {
	Session.destroy();
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
	$location.path('/');
});

