var express = require("express");
var router = express.Router();
var session = require("express-session");
var firebase_app = require("../firebase-app");
var { getAuth, createUserWithEmailAndPassword } = require("firebase/auth");
var { collection, addDoc } = require("firebase/firestore");
var { getFirestore } = require("firebase/firestore");

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = getFirestore(firebase_app);
    const auth = getAuth(firebase_app);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        const docRef = addDoc(collection(db, "users"), {
          email: email,
          user_uid: user.uid,
          membership: "none",
        });
        session = req.session;
        session.userid = user.uid;
        res.redirect("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorMessage)
      });
  } catch (error) {
    const errorCode = error.code;
    res.render("register", { title: "Express - Register", errorCode});
  }
});

router.get("/", function (req, res) {
  session = req.session;
  if (session.userid) {
    res.redirect("/");
  } else res.render("register", { title: "Express - Register" });
});

module.exports = router;
