var fs         = require('fs');
var bitauth    = require('bitauth');
var HOME       = process.env['HOME'];
var BitPay     = require('../lib/rest-client');
var encPrivkey = fs.readFileSync(HOME + '/.bitpay/api.key').toString();
var config     = require('../config');
var privkey    = bitauth.decrypt(config.keyPassword, encPrivkey);
var client     = new BitPay(privkey);

if (process.argv.length < 3) {
  console.log("Usage: get-invoice-by-id.js [invoiceID]");
  return;
}

client.on('ready', function() {

  client.get('invoices/' + process.argv[2], function(err, invoice) {
    invoice.post('notifications', function(err, msg) {
      console.log(err || msg);
    });    
  });

});
