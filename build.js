/*This file setup firebase variables config*/

var fs = require('fs');

fs.readFile('./firebaseConfig.js', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

  var result = data.replace('process.env.FIREBASE_API_KEY', '"'+process.env.FIREBASE_API_KEY+'"');
  result = result.replace('process.env.FIREBASE_AUTH_DOMAIN', '"'+process.env.FIREBASE_AUTH_DOMAIN+'"');
  result = result.replace('process.env.FIREBASE_DATABASE_URL', '"'+process.env.FIREBASE_DATABASE_URL+'"');
  result = result.replace('process.env.FIREBASE_PROJECT_ID', '"'+process.env.FIREBASE_PROJECT_ID+'"');
  result = result.replace('process.env.FIREBASE_STORAGE_BUCKET', '"'+process.env.FIREBASE_STORAGE_BUCKET+'"');
  result = result.replace('process.env.FIREBASE_MESSAGING_SENDER_ID', '"'+process.env.FIREBASE_MESSAGING_SENDER_ID+'"');

  fs.writeFile('./firebaseConfig.js', result, 'utf8', function (err) {
    if (err) return console.log(err);
  });

  console.log('Firebase setup done ! ');
});
