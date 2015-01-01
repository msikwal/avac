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
.controller('VacDetailsCtrl', function ($scope,VacService,Session,$location) {
	var handleSuccessCall = function (rowdata){
		//$scope.userDetails  = rowdata.data[0];
		$scope.vac_details = rowdata.data;
	};
	$scope.updateShedule = function(id,birthDate,index){
		console.log(id,$scope.vac_details[birthDate][index]);
	};
	$scope.showVacDetails =function (key){
		$(".table-responsive").hide('slow');
		if($(".d_"+key).css('display')==='none'){
			$(".d_"+key).show('slow');
		}	
	};
	if(Session.userId){
		$scope.mobile = Session.userId;
		VacService.getChildVacDetails({
			callback: handleSuccessCall,
			mobile: '?mode=vac&user_id='+Session.getCurrentUser().user_id
		});
	}else{
		$location.path('/login');
	}   

}).controller('VacChartCtrl', function ($scope,VacService){
	VacService.getChildVacChartDetails({
		callback: function (rowdata){
			$scope.vac_chart_details = rowdata.data;
		},
		mobile:'?mode=vacChart'
	});
}).controller('UserReportDetailsCtrl', function ($scope,VacService){
	console.log("dasdasd");
	$scope.userFlag = false;
	$scope.getSubscriptions = function(user){
		console.log(user);
		if(user.mobile_num){
			VacService.getChildVacDetails({
				callback: handleSuccessCall,
				mobile: '?mode=vac&mobile='+user.mobile_num
			});
		}
	};
	var handleSuccessCall = function (rowdata){
		console.log(rowdata);
		$scope.userFlag = true;
		$scope.vac_details = rowdata.data;
	};
	$scope.showVacDetails =function (key){
		$(".table-responsive").hide('slow');
		if($(".d_"+key).css('display')==='none'){
			$(".d_"+key).show('slow');
		}	
	};
});
