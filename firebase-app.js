var {initializeApp} = require('firebase/app')

var firebaseConfig = {
    apiKey: "AIzaSyDRybXw2zGFIxgp8ejQtd0JYC9-5njZEYQ",
    authDomain: "membership-test-8449a.firebaseapp.com",
    projectId: "membership-test-8449a",
    storageBucket: "membership-test-8449a.appspot.com",
    messagingSenderId: "548755210563",
    appId: "1:548755210563:web:7709823dbb40b3c23e2ff6",
    measurementId: "G-0ZHMPJV5D8"
  };
  
var firebase_app = initializeApp(firebaseConfig);

module.exports = firebase_app;