const express = require('express');
const Promise = require('bluebird');
const githubHelper = require('../helpers/github.js');
const mongo = require('../database/index.js');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());

// app.post('/repos', function (req, res) {
//   githubHelper.getReposByUsername(req.body.full_name)
//     .then(result => {
//       console.log('/repos post success');
//     })
//     .then(() => mongo.top25)
//     .then(result => res.send(result))
//     .catch(error => console.log(error));
// });

app.post('/repos', function (req, res) {
  githubHelper.getReposByUsername(req.body.full_name)
    .then(result => {
      res.send(result);
    })
    .catch(error => console.log(error));
});

app.get('/repos', function (req, res) {
  mongo.top25()
    .then(result => {
      res.send(result);
    })
    .catch(error => console.log(error));
});

let port = process.env.PORT || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});


// // used this to test countDocuments functionality
// app.post('/test', function (req, res) {
//   console.log(req.body);
//   mongo.idExists(req.body.id);
// })

