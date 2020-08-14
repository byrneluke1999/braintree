var express = require("express");
var router = express.Router();
var braintree = require("braintree");

router.post("/", function (req, res, next) {
  var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: "XYZ",
    publicKey: "XYZ",
    privateKey: "XYZ",
  });

  // payment nonce from index.hbs
  var nonceFromTheClient = req.body.paymentMethodNonce;
  // I chose a fixed fee of 50 euro for all transactions
  var Transaction = gateway.transaction.sale(
    {
      amount: "50.00",
      paymentMethodNonce: nonceFromTheClient,
      options: {
        // request funds from the transaction
        // once authorized successfully
        submitForSettlement: true,
      },
    },
    function (error, result) {
      if (result) {
        res.send(result);
      } else {
        res.status(500).send(error);
      }
    }
  );
});

module.exports = router;
