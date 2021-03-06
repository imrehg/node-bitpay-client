var fs         = require('fs');
var bitauth    = require('bitauth');
var HOME       = process.env['HOME'];
var BitPay     = require('../lib/rest-client');
var encPrivkey = fs.readFileSync(HOME + '/.bitpay/api.key').toString();
var config     = require('../config');
var privkey    = bitauth.decrypt(config.keyPassword, encPrivkey);
var client     = new BitPay(privkey);

client.on('ready', function() {

  client.as('user').get('user', function(err, user) {
    console.log(user)
    user.put({
      phone: '123-456-7890',
      name: 'Satoshi Nakamoto'
    }, function(err, user) {
      console.log(err || user);
    });
  });

});
