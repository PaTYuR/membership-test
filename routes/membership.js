var express = require("express");
var router = express.Router();
var session = require("express-session");
var firebase_admin = require("../firebase-admin");

var db = firebase_admin.firestore();

router.get("/", async function (req, res) {
  session = req.session;
  if (session.userid) {
    const userRef = await db.collection("users");
    userRef
      .where("user_uid", "==", session.userid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var doc_id = doc.id;
          var variant = doc.data().membership;
          if (doc.data().membership == "none") {
            res.render("membership", {
              title: "Express - Membership",
              doc_id,
              variant
            });
          } else if (doc.data().membership == "bronze") {
            res.render("membership", {
              title: "Express - Membership",
              doc_id,
              variant,
            });
          } else if (doc.data().membership == "silver") {
            res.render("membership", {
              title: "Express - Membership",
              doc_id,
              variant,
            });
          } else if (doc.data().membership == "gold") {
            res.render("membership", {
              title: "Express - Membership",
              doc_id,
              variant,
            });
          }
        });
        return null;
      });
  } else res.redirect("/login");
});

router.post("/", async function (req, res) {
  var variant = req.query.variant;
  var doc_id = req.query.id;

  const userRef = db.collection("users").doc(doc_id);
  await userRef
    .update({
      membership: variant,
    })
    .then(() => {
      res.redirect("/");
    });
});

module.exports = router;
