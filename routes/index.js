var express = require("express");
var router = express.Router();
var cookieParser = require("cookie-parser");
var session = require("express-session");

var { getAuth, onAuthStateChanged } = require("firebase/auth");
var firebase_app = require("../firebase-app");
var firebase_admin = require("../firebase-admin");

const Authenticate = function (req, res, next) {
  const auth = getAuth(firebase_app);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
      console.log("no user");
    }
  });
  next();
};

const oneDay = 1000 * 60 * 60 * 24;

router.use(cookieParser());
router.use(
  session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  }),
  Authenticate
);

// a variable to save a session
var session;

router.get("/", async function (req, res) {
  session = req.session;
  if (session.userid) {
    var db = firebase_admin.firestore();
    const userRef = await db.collection("users");
    userRef
      .where("user_uid", "==", session.userid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().membership == "none") {
            res.redirect("/membership");
          } else if (doc.data().membership == "bronze") {
            var loop_article = 3;
            var loop_video = 3
            res.render("index", {
              title: "Express",
              session: session.userid,
              loop_article,
              loop_video
            });
          } else if (doc.data().membership == "silver") {
            var loop_article = 10;
            var loop_video = 10
            res.render("index", {
              title: "Express",
              session: session.userid,
              loop_article,
              loop_video
            });
          } else if (doc.data().membership == "gold") {
            var loop_article = 13;
            var loop_video = 13
            res.render("index", {
              title: "Express",
              session: session.userid,
              loop_article,
              loop_video
            });
          }
        });
        return null;
      });
  } else res.redirect("/login");
});

module.exports = router;
