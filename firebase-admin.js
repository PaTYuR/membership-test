var admin = require("firebase-admin");
var serviceAccount = require("./FIREBASE_CONFIG.json");
// Initialize Firebase
var firebase_admin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
module.exports = firebase_admin;