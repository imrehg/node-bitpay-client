var fs         = require('fs');
var async      = require('async');
var bitauth    = require('bitauth');
var HOME       = process.env['HOME'];
var BitPay     = require('../lib/rest-client');
var encPrivkey = fs.readFileSync(HOME + '/.bitpay/api.key').toString();
var config     = require('../config');
var privkey    = bitauth.decrypt(config.keyPassword, encPrivkey);
var client     = new BitPay(privkey);

var data = {
  amount: 400,
  currency: 'USD',
  reference: '12345',
  effectiveDate: 1390246334,
  pricingMethod: 'vwapPrev24hBitstamp',
  notificationURL: 'https://svr03psmy.myco.com/advice/bpb',
  instructions: [
    {
      label: 'BillGates',
      address: 'mfahwRvbhQVtMWvdHWsdgVGYgimqqzZEXB',
      amount: 50
    },{
      label: 'TimCook',
      address: 'mfadguj41aYgEwPATAFnkKcKQNqhpNTrdi',
      amount: 50
    },{
      label: 'SatyaNadella',
      address: 'mfZJUVDcKii3GgX3xfD6gFUGMfuh9cLuf6',
      amount: 300
    }
  ]
};

client.on('ready', function() {

  client.as('payroll').post('payouts', data, function(err, payoutrequest) {
    console.log(err || payoutrequest)
  });

});
