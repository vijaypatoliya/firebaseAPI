'use strict';

const ENVIRONMENT = require('./Environment');
let CONFIG = {};
let FIREBASE_CONFIG = {};
let nodeEnv = ENVIRONMENT.ENV;

if (nodeEnv === 'local') {
  CONFIG = {
    'nodeEnv': 'local',
    'uiUrl': 'http://localhost:8000',
    'dbUrl': 'mongodb://localhost:27017/',
    'dbName': 'angular_app',
    'option': {
      'server': {
        'reconnectTries': 5000,
        'reconnectInterval': 0,
        'socketOptions': {
          'socketTimeoutMS': 100000,
          'connectTimeoutMS': 100000
        }
      }
    }
  };
  FIREBASE_CONFIG = {
    'authDomain': 'fir-app-8f60b.firebaseapp.com',
    'databaseURL': 'https://fir-app-8f60b.firebaseio.com',
    'projectId': 'fir-app-8f60b',
    'storageBucket': 'fir-app-8f60b.appspot.com',
    'messagingSenderId': '994865580935'
  };
}
exports.CONFIG = CONFIG;
exports.FIREBASE_CONFIG = FIREBASE_CONFIG;
