/**
 * Minds::mobile
 * Notifications settings controller
 *
 * @author Mark Harding
 */

define(function() {
	'use strict';

	function ctrl($rootScope, $scope, $state, $ionicScrollDelegate, Cacher, Client, storage, $ionicPopover, $ionicLoading, $ionicModal, $ionicPopup, $timeout, push) {

		$scope.cb = Date.now();
		$scope.inProgress = false;
		$scope.toggles = {
      'daily': { name: 'Daily Reward', icon: 'icon-bank', toggle: true },
      'comment': { name: 'Comments', icon: 'ion-chatbox', toggle: true },
      'like': { name: 'Votes', icon: 'ion-thumbsup', toggle: true },
      'tag': { name: 'Tags', icon: 'ion-at', toggle: true },
      'friends': { name: 'Subscriptions', icon: 'ion-person-add', toggle: true },
      'remind': { name: 'Reminds', icon: 'icon-remind', toggle: true },
      'boost_request': { name: 'Peer2Peer boosts', icon: 'ion-arrow-graph-up-right', toggle: true },
      'boost_accepted': { name: 'Approved boosts', icon: 'ion-arrow-graph-up-right', toggle: true },
      'boost_rejected': { name: 'Rejected boosts', icon: 'ion-arrow-graph-up-right', toggle: true },
      'boost_completed': { name: 'Fulfilled boosts', icon: 'ion-arrow-graph-up-right', toggle: true }
    };


    $scope.load = function() {
        $scope.inProgress = true;
        Client.get('api/v1/notifications/settings', {
          cb: $scope.cb
        }, function(data) {
          for (var toggle in $scope.toggles) {
            $scope.toggles[toggle].toggle = data.toggles[toggle];
          }
          $scope.inProgress = false;
        });
    };
    $scope.load();


    $scope.setToggle = function(id, toggle) {
      console.log(id, toggle);
      Client.post('api/v1/notifications/settings', {
        id: id,
        toggle: toggle
      });
    };


	}


	ctrl.$inject = ['$rootScope', '$scope', '$state', '$ionicScrollDelegate', 'Cacher', 'Client', 'storage', '$ionicPopover', '$ionicLoading', '$ionicModal', '$ionicPopup', '$timeout', 'push'];
	return ctrl;

});
