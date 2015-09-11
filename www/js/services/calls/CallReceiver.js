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
            if(!guid){
              return console.log('bad ' + message + 'socket sent');
            }
            switch (message.type){
                case 'call':
                    if (!$rootScope.inCall && $rootScope.user_guid) {
                        incomingCall(guid, {name: "..."});
                        socket.emit('sendMessage', guid, {type:'available'});
                    } else if (!$rootScope.user_guid) {
                      //if we're not logged in, reject
                      socket.emit('sendMessage', guid, {type:'reject'});
                    } else {
                      console.log('engaged..');
                    //  socket.emit('sendMessage', guid, {type:'engaged'});
                    }
                    break;

            }
        });

        push.listen('call', function(data) {
          console.log(data, data.json);
          incomingCall(data.json.from_guid, {name: data.json.from_name});
        });

        var incomingCall = function(guid, user, offer) {
            if ($rootScope.inCall || $scope.modal)
                return false;

            $rootScope.inCall = true;

            $scope.callConfig = {
                initiator: false,
                guid: guid,
                name: user.name
            };

            //get the profile of who is calling
            Client.get('api/v1/channel/' + guid, {},
                function(success) {
                    $scope.callConfig.name = success.channel.name;
                },
                function(error) {
                });

            $timeout(function() {
                $ionicModal.fromTemplateUrl('templates/gatherings/chat/call.html', {
                    scope: $scope,
                    animation: 'slide-in-up',
                    backdropClickToClose: false,
                    hardwareBackButtonClose: false
                }).then(function(modal) {
                    $scope.modal = modal;
                    $scope.modal.show();
                    //document.getElementById('ringing').play();
                    window.navigator.vibrate(200); // vibrate for 200ms
                    $rootScope.inCall = true;
                });
           });
        };

        $scope.$on('modal.removed', function() {
          $scope.modal = null;
          $timeout(function(){
            $rootScope.inCall = false;
          }, 1000);
          document.getElementById('ringing').pause();
          console.log('caller modal was removed');
        });

        return {};

    };

    factory.$inject = ['$rootScope', '$timeout', '$interval', '$ionicModal', 'socket', 'push', 'Client'];
    return factory;
});
