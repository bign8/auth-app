
/* ------------------------------------------------------------------- *|
 * angular page accents
 * docs:  https://docs.angularjs.org/api/
 * ------------------------------------------------------------------- */

angular.module('auth', [
	'ArrestDB',
	'ngRoute',
	'ui.bootstrap',
]).

// Configure Routes
config(['$routeProvider', function ( $routeProvider ) {
	$routeProvider.when('/', {
		controller: 'index',
		templateUrl: '/tpl/index.html',
		title: 'Welcome',
	}).when('/edit', {
		controller: 'edit',
		templateUrl: '/tpl/edit.html',
		title: 'Edit',
	}).otherwise({
		redirectTo: '/'
	});
}]).

// Update title + subTitle based on route object (move to factory if we need access)
run(['$rootScope', '$route', function ( $rootScope, $route ) {
	$rootScope.$on('$routeChangeSuccess', function () {
		$rootScope.title = $route.current.title || 'Welcome';
		$rootScope.subTitle = $route.current.subTitle || '';
	});
}]).

// Authenticating service
service('AuthService', function () {
	var access = 1;
	this.setAccess = function (value) {
		access = value;
	};
	this.getAccess = function () {
		return access;
	};
}).

// Index controller
controller('index', ['$scope', function ( $scope ) {
	$scope.test = 'test';
	$scope.state = 'login'; // frogot, register
}]).

// Edit Controller
controller('edit', ['$scope', function ( $scope ) {
	$scope.test = 'edit';
}]).

// Manage Controller
controller('manage', ['$scope', function ($scope) {
	$scope.test = 'manage';
}]);