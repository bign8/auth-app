
/* ------------------------------------------------------------------- *|
 * angular page accents
 * docs:  https://docs.angularjs.org/api/
 * ------------------------------------------------------------------- */

angular.module('auth', [
	'ngRoute',
]).

// Configure Routes
config(['$routeProvider', function ( $routeProvider ) {
	$routeProvider.when('/', {
		controller: 'index',
		templateUrl: 'tpl/index.html',
		title: 'Welcome',
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

// Index controller
controller('index', ['$scope', function ( $scope ) {
	$scope.test = 'test';
}]);