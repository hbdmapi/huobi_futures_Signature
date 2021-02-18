// run such as:
// node signature.js POST api.hbdm.vn /linear-swap-api/v1/swap_cross_account_info x-x-x-x x-x-x-x 2021-02-18T10:01:57

var CryptoJS = require("crypto-js"); // npm install crypto-js

function sign(op, host, path, access_key, secret_key, time) {

    var signstr = "AccessKeyId=" + access_key + "&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp=" + encodeURIComponent(time);

    var payload = op.toUpperCase() + "\n" +
        host + "\n" +
        path + "\n" +
        signstr
    console.log(payload);

    var signatureBytes = CryptoJS.HmacSHA256(payload, secret_key);
    var signature = CryptoJS.enc.Base64.stringify(signatureBytes);
    console.log(signature);

    var URLSIGN = signstr+"&Signature="+encodeURIComponent(signature)
    console.log(URLSIGN);
}

TIP = "usage: op host path access_key secret_key time\nsuch as: POST api.hbdm.com /api/v1/contract_order e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx bfxxxxxx-56xxxxxx-cbxxxxxx-e7xxx 2021-02-01T15:19:30"
var arguments = process.argv.splice(2);
if (arguments.length != 6) {
    console.log(TIP)
} else {
    sign(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
}