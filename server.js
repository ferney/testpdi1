const express = require('express')
const app = express();
var bodyParser = require('body-parser');
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./client_secret.json');
var doc = new GoogleSpreadsheet('1zaEMvx-kE_uSfxv0v3X9kvuv0NfIPZA4B6IuykTmdXQ');
var util = require('util');
var port = 4000;

app.use(bodyParser.json());

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

app.post('/submitData', function(req, res) {
    console.log("POST request recieved. Body: " + JSON.stringify(req.body));

    doc.useServiceAccountAuth(creds, function (err) {
        doc.addRow(1, req.body, function(err) {
          if(err) {
            console.log(err);
          }
        });
    });
})

doc.useServiceAccountAuth(creds, function (err) {
  // Get all of the rows from the spreadsheet.
  doc.getRows(1, function (err, rows) {
    console.log(rows);
  });
});

app.listen(port, () => console.log('App listening on port 3000!'))