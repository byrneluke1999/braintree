var express = require("express");
var router = express.Router();
var braintree = require("braintree");

//refundId = "jqhc4jjf";
refundId = "fq89wrc6";
router.post("/", function (req, res, next) {
  var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: "c86s6scrc4fk24mc",
    publicKey: "kj9p8zzs8kgssf9c",
    privateKey: "d92b87d4432e98140bdd1e51e17bdd37",
  });
  //I tried passsing the transaction Id from the just processed payment to this route as the transaction id for the refund, but this of course
  //wasn't going to work because the page is refreshed when navigating back to process a refund.
  //var refund = gateway.transaction.refund(transactionID, function (

  //Throughout testing I just used a variable for the transaction id to be refunded like below.
  var refund = gateway.transaction.refund(refundId, function (error, result) {
    if (result) {
      res.send(result);
    } else {
      res.status(500).send(error);
    }
  });
});

module.exports = router;
