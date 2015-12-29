/**
 * Minds::mobile
 * Channel Controller
 *
 * @author Mark Harding
 */

define(function() {
	'use strict';

	function ctrl($rootScope, $scope, $state, $stateParams, Client, $ionicSlideBoxDelegate, $ionicScrollDelegate,
		$interval, $timeout, storage, $ionicActionSheet, $ionicLoading, $ionicHistory) {

		if ($stateParams.username === undefined) {
			$state.go('tab.newsfeed');
			return false;
		}

		$scope.loaded = false;
		$scope.next = "";
		$scope.ChannelItems = [];
		var interval;

		$scope.cb = Date.now();
		var statelistener = $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
			if (from.name == 'tab.newsfeed-channel-edit') {
				$scope.cb = Date.now();
				$scope.init();
			}

			if (from.name == 'tab.newsfeed-channel') {
				if (interval)
					$interval.cancel(interval);
			}

			//$scope.cb = Date.now();
			//$scope.init();
		});

		$scope.$on("$destroy", function() {
			if (interval)
				$interval.cancel(interval);
			statelistener();
		});

		$scope.init = function() {
			console.log('init called');
			Client.get('api/v1/channel/' + $stateParams.username, {
				cb: $scope.cb
			}, function(success) {

				if (success.status == 'error') {
					$state.go('tab.newsfeed');
					return true;
				}

				$scope.channel = success.channel;

				//$scope.$apply();
				console.log($scope.channel);
				if ($rootScope.guid == $scope.channel.guid) {
					storage.set('city', $scope.channel.city);
					storage.set('coordinates', $scope.channel.coordinates);
				}

				if ($scope.ChannelItems.length === 0) {
					//run on next digest
					$timeout(function() {
						$scope.loadMore();
					});
				}

				if (success.channel.carousels) {
					$ionicSlideBoxDelegate.update();
					interval = $interval(function() {
						$ionicSlideBoxDelegate.$getByHandle('channel-banners').slide(0);
					}, 3000 * success.channel.carousels.length);
				}

			}, function(error) {
			});
		};
		$scope.init();

		/*setInterval(function(){
		 var top = $ionicScrollDelegate.getScrollPosition().top;
		 if(top > 10){
		 $scope.carousel_class = "blur";
		 } else {
		 $scope.carousel_class = "not-blurred";
		 }
		 $scope.$apply();
		 }, 100);*/

		$scope.loadMore = function() {
			if (!$scope.channel) {
				return false;
			}
			console.log('getting a users feed');
			Client.get('api/v1/newsfeed/personal/' + $scope.channel.guid, {
				limit: 6,
				offset: $scope.next,
				cb: Date.now()
			}, function(data) {
				$scope.loaded = true;

				if (!data.activity) {
					console.log('users feed not found');
					$scope.$broadcast('scroll.refreshComplete');
					$scope.hasMoreData = false;
					return false;
				} else {
					console.log('found users feed, loading it');
					$scope.hasMoreData = true;
				};

				$scope.ChannelItems = $scope.ChannelItems.concat(data.activity);

				$scope.next = data['load-next'];

				$scope.$broadcast('scroll.infiniteScrollComplete');
				$scope.$broadcast('scroll.refreshComplete');

			}, function(error) {
				$scope.$broadcast('scroll.infiniteScrollComplete');
				$scope.$broadcast('scroll.refreshComplete');
			});
		};

		$scope.back = function() {
			$ionicHistory.goBack();
		}

		$scope.channelRefresh = function() {
			if (!$scope.channel) {
				return false;
			}
			$scope.next = "";
			$scope.loadMore();
		};

		$scope.subscribe = function(channel) {

			$scope.channel.subscribed = true;
			$scope.channel.subscribers_count = $scope.channel.subscribers_count + 1;
			Client.post('api/v1/subscribe/' + channel.guid, {}, function() {
			}, function() {
				$scope.channel.subscribed = false;
				$scope.channel.subscribers_count = $scope.channel.subscribers_count - 1;
			});

		};

		$scope.unSubscribe = function(channel) {

			$scope.channel.subscribed = false;
			$scope.channel.subscribers_count = $scope.channel.subscribers_count - 1;
			Client.delete('api/v1/subscribe/' + channel.guid, {}, function() {
			}, function() {
				$scope.channel.subscribed = true;
				$scope.channel.subscribers_count = $scope.channel.subscribers_count + 1;
			});

		};

		$scope.block = function(channel) {
			$scope.channel.blocked = true;
			Client.put('api/v1/block/' + $scope.channel.guid, {},
				function(response){}, function(error) {
				console.log(error);
				$scope.channel.blocked = false;
			});

		};

		$scope.unBlock = function(channel) {
			$scope.channel.blocked = false;
			Client.delete('api/v1/block/' + $scope.channel.guid, {}, function() {
			}, function() {
				$scope.channel.blocked = true;
			});

		};

		$scope.openMenu = function(channel) {
			var buttons = [
				{
					text: 'Message'
				},
				{
					text: channel.blocked ? 'Un-Block' : 'Block'
				}
			];

			$ionicActionSheet.show({
				buttons: buttons,
				cancelText: 'Cancel',
				cancel: function() {
					// add cancel code..
				},
				buttonClicked: function(index) {
					switch (index) {
					case 0:
						if ($scope.channel.blocked){
							$ionicLoading.show({
								template: 'Sorry, you can not send message to a blocked user.'
							});
							$timeout(function() {
								$ionicLoading.hide();
							}, 2000);
						}
						else $state.go("tab.chat-conversation", {username: $scope.channel.guid, name: $scope.channel.name});
						break;
					case 1:
						if (channel.blocked) {
							$scope.unBlock(channel);
						}
						else $scope.block(channel);
						break;
					}
					return true;
				}
			});
		};

	}


	ctrl.$inject = ['$rootScope', '$scope', '$state', '$stateParams', 'Client', '$ionicSlideBoxDelegate', '$ionicScrollDelegate',
	'$interval', '$timeout', 'storage', '$ionicActionSheet', '$ionicLoading', '$ionicHistory'];
	return ctrl;

});
