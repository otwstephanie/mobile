Minds Mobile App
======

[![Build Status](https://travis-ci.org/Minds/mobile.svg?branch=master)](https://travis-ci.org/Minds/mobile)

The world's first open-source and encrypted social networking app (That we know of...). We reward you with viral reach just for using the app.

The core engine code will be released later in 2015. Don't worry! 

##Platforms
- Android
- iOS


##Features

- Encrypted messenger
- Capture (Video, Photos, Upload from library)
- Boost (Exchange your points with Minds or p2p with other users for expanded reach) 
- Wallet (Earn points just for using the app or purchase them)
- Newsfeed 
- Profiles
- Discovery (Search and swipe to vote on content and connect with channels)
- Geo-location filter for social discovery and local networking
- Vote, Comment and Remind posts
- Subscribe to other channels
- Notifications

##Tech

#####Cordova (http://cordova.apache.org/)
_Cordova (phonegap) is a fantastic tool which lets you run HTML5 in native apps._

#####Ionic (http://ionicframework.com/)
_Ionic is a framework for making ui/ux work well with your app._

#####Angularjs (https://angularjs.org/)
_Angularjs is a MVC framework which make maintaining and development app easy_

#####Requirejs (http://requirejs.org/)
_RequireJS is a file and module loader used to improve speed and quality of code and bring sanity to developers_

#####neo4j (http://neo4j.com)
_neo4j is the World’s Leading Graph Database._

##Creators

- Mark Harding
- Bill Ottman

##License

This project is licensed under the AGPLv3 free software license. See license for full text. 

##Contributing

You will need to a few tools in order to contribute to this project:

#### NPM

Ubuntu:
```
curl -sL https://deb.nodesource.com/setup | sudo bash -
sudo apt-get install -y nodejs
```

Mac:
```
brew install node
```
Don't have brew?
```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

#### Grunt
```
sudo npm -g install grunt-cli
```

#### Run-once setup

```
npm install
```

### Compiling / Building

Run `cordova build`

### Environment configurations

Minds supports multiple environments. See `config/config-example.js` for an example. 

To run a production build run `export config_target=prod; cordova build`

### Connecting with your own Minds site?

Please see https://github.com/Minds/mobile/wiki/Configuring-with-your-Minds-site
