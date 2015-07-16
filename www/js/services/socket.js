/**
 * Minds::mobile
 * Sockets servcies
 *
 * @author Mark Harding
 */

define(['angular', 'socketio'], function(angular, io) {
    "use strict";

    var factory = function($rootScope, storage) {

		var socket = io.connect('http://www.minds.io:3000', {
						'reconnect': true
						});
		socket.on('connect', function() {
			socket.emit('register', $rootScope.user_guid, storage.get('access_token'));
		});

		return socket;

    };

    factory.$inject = ['$rootScope', 'storage'];
    return factory;
});
