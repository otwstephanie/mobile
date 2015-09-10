/**
 * Minds::mobile
 * Sockets servcies
 *
 * @author Mark Harding
 */

define(['angular', 'socketio'], function(angular, io) {
    "use strict";

    var factory = function($rootScope, storage, $interval) {

  		var socket = io.connect('https://ha-socket-io-us-east-1.minds.com:3030', {
						'reconnect': true,
             'reconnection': true,
             'timeout': 40000
						});
  		socket.on('connect', function() {
  			socket.emit('register', $rootScope.user_guid, storage.get('access_token'));
  		});

      socket.on('disconnect', function() {
        var reconnect = $interval(function(){
          if(socket.connected)
            return $interval.cancel(reconnect);
          socket.io.connect();
        },1000);
      });

  		return socket;

    };

    factory.$inject = ['$rootScope', 'storage', '$interval'];
    return factory;
});
