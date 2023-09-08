var express = require("express");
var router = express.Router();
var session = require("express-session");
var {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} = require("firebase/auth");
var firebase_app = require("../firebase-app");

router.post("/", async function (req, res) {
  var method = req.query.method;
  const auth = getAuth(firebase_app);
  const goole_provider = new GoogleAuthProvider();
  const facebook_provider = new FacebookAuthProvider();

  if (method == "google") {
    signInWithPopup(auth, goole_provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        res.render("login", { title: "Express - Login", errorCode });
      });
  } else if (method == "facebook") {
    signInWithPopup(auth, facebook_provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
        res.render("login", { title: "Express - Login", errorCode });
      });
  } else {
    const { email, password } = req.body;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        session = req.session;
        session.userid = user.uid;
        res.redirect("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        res.render("login", { title: "Express - Login", errorCode });
      });
  }
});

router.get("/", function (req, res) {
  session = req.session;
  if (session.userid) {
    res.redirect("/");
  } else res.render("login", { title: "Express - Login" });
});

module.exports = router;
