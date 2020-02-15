var app = angular.module('food-list', ['ngAnimate']);
app.controller('show', function($scope) {
    $scope.count = 0;
	$scope.newcomment = true;
	$scope.i_comment = -1;
});

