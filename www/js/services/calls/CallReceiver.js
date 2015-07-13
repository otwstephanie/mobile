/**
 * Minds::mobile
 * Sockets servcies
 *
 * @author Mark Harding
 */

define(['angular', 'socketio'], function(angular) {
    "use strict";

	var factory = function($rootScope, $timeout, $interval, $ionicModal, socket, push, Client) {

		//the modal will inherit this scope
		var $scope = $rootScope.$new();

		socket.on('messageReceived', function(guid, message) {
			switch (message.type){
				case 'call':
					if (!$rootScope.inCall) {
						incomingCall(guid, {name: "..."});
					} else {
						socket.emit('sendMessage', guid, {type:'engaged'});
					}
					break;
				//case 'offer':
				//	incomingCall(guid, JSON.parse(message.user), JSON.parse(message.offer));
				//	break;
				case 'queue':
					console.log('your queue is..');
					console.log(message);

					if (!$rootScope.inCall)
						incomingCall( message.queue.caller, {name: "..."});
					break;
			}
		});

		push.listen('call', function() {
			socket.emit("queue");
		});

		var incomingCall = function(guid, user, offer) {
			if ($rootScope.inCall)
				return false;

			$rootScope.inCall = true;

			document.getElementById('ringing').play();

			$scope.callConfig = {
				initiator: false,
				guid: guid,
				name: user.name
			};
			
			//get the profile of who is calling
			Client.get('api/v1/channel/' + guid, {}, 
				function(success){
					$scope.callConfig.name = success.channel.name;
				}, 
				function(error){
				});

			$timeout(function() {
				$ionicModal.fromTemplateUrl('templates/gatherings/chat/call.html', {
					scope: $scope,
					animation: 'slide-in-up'
				}).then(function(modal) {
					$scope.modal = modal;
					$scope.modal.show();
				});
			});
		};

		return {};

    };

    factory.$inject = ['$rootScope', '$timeout', '$interval', '$ionicModal', 'socket', 'push', 'Client'];
    return factory;
});
