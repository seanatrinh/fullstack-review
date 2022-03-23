const mongoose = require('mongoose');
const Promise = require('bluebird');

mongoose.connect('mongodb://localhost/fetcher', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex:true
});


let repoSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  full_name: String,
  owner_login: String,
  html_url: String,
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (responseObj) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  const add = new Repo({
    id: responseObj.id,
    full_name: responseObj.full_name,
    owner_login: responseObj.owner_login,
    html_url: responseObj.html_url,
    forks: responseObj.forks
  });
  // save to mongoDB
  add.save();
}



let top25 = () => {

  return new Promise ((resolve, reject) => {
    Repo.find()
      .sort({forks: 'desc'})
      .limit(25)
      .then(results => {
        resolve(results);
      })
      .catch(err => {
        reject(err);
      })
  })
}



module.exports = {
  save: save,
  top25: top25
};

// ***********

// let repoAdder = function(responseObj) {
//   Repo.countDocuments({id: responseObj.id}, function(err, count) {
//     if (err) {
//       console.log('Error with countDocuments query --- ', err);
//     } else if (count === 0) {
//       // if unique ID was not found in DB, create a new entry
//       const add = new Repo({
//         id: responseObj.id,
//         full_name: responseObj.full_name,
//         owner_login: responseObj.owner_login,
//         html_url: responseObj.html_url,
//         forks: responseObj.forks
//       });
//       // save to mongoDB
//       add.save();
//     } else {
//       console.log(`Repo already exists in db. Did not add ${responseObj.full_name}`);
//     }
//   });
// }
// // use repoAdder on each repo in the response object
// // filteredArray.forEach(obj => {
// //   repoAdder(obj);
// // });

// // do I need to promisify above?

// return new Promise((resolve, reject) => {
//   // what would I resolve / reject?
//   filteredArray.forEach(obj => {
//     repoAdder(obj);
//   });
//   resolve('database/index.js promise worked')
// })

// ***********

// // test countDocuments to see if it is a viable solution to find duplicates
// let idExists = (id) => {
//   Repo.countDocuments({id: `${id}`}, function(err, count) {
//     if (err) {
//       console.log('This is the error output --- ', err);
//     } else {
//       console.log('This is the count output --- ', count);
//     }
//   })
// }

// old logic to find if entry exists below
  // Repo.findOne({'id': responseObj.id}, function(err, repo) {
  //   // if error, that means repo ID doesn't exist in db. create rep in db.
  //   if (repo === null) {
  //     const add = new Repo({
  //       id: responseObj.id,
  //       full_name: responseObj.full_name,
  //       owner_login: responseObj.owner_login,
  //       html_url: responseObj.html_url,
  //       forks: responseObj.forks
  //     });

  //     // save to mongoDB
  //     add.save();

  //   // if no error, repo ID exists in db. no need to add.
  //   } else {
  //     console.log('there is no error... this is repo ----', repo)
  //     console.log('this is the actual error: ', err);
  //     console.log(`Repo already exists in db. Did not add ${responseObj.full_name}`);
  //   }
  // });