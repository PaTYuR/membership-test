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
            res.redirect("/");
          } else {
            var id_article = req.query.id_article;
            console.log(id_article);
            if (id_article != undefined) {
              res.render("article", {
                title: "Express - Article",
                id_article,
              });
            } else {
              res.redirect("/");
            }
          }
        });
        return null;
      });
  } else res.redirect("/login");
});

module.exports = router;
