var express = require("express");
var router = express.Router();
var braintree = require("braintree");

router.post("/", function (req, res, next) {
  var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    // Use your own credentials from the sandbox Control Panel here
    merchantId: "c86s6scrc4fk24mc",
    publicKey: "kj9p8zzs8kgssf9c",
    privateKey: "d92b87d4432e98140bdd1e51e17bdd37",
  });

  // Use the payment method nonce here
  var nonceFromTheClient = req.body.paymentMethodNonce;
  // Create a new transaction for $10
  var newTransaction = gateway.transaction.refund("qwagdaq2", function (
    error,
    result
  ) {
    if (result) {
      res.send(result);
    } else {
      res.status(500).send(error);
    }
  });
});

module.exports = router;
