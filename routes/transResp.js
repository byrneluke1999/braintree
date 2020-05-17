var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/transResp", function (req, res, next) {
  res.render("transResp", { title: "Express" });
});

module.exports = router;
