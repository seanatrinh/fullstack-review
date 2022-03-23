const axios = require('axios');
const config = require('../config.js');
const Promise = require('bluebird');
const mongo = require('../database/index.js');

let getReposByUsername = (username) => {

  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  return axios.get(options.url)
    .then(response => {
      response.data.forEach(repo => {
        mongo.save({
          id: repo.id,
          full_name: repo.full_name,
          owner_login: repo.owner.login,
          html_url: repo.html_url,
          forks: repo.forks
        })
      });
    })
    // .then(returnArray => (returnArray.map(item => mongo.save(item))))
    // .then(result => console.log(result))
    .catch(error => console.log(error));
}

module.exports.getReposByUsername = getReposByUsername;

  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL

/*
old code below - learnings: no need to promisify an axios return, since axios is already promisified

  // return new Promise((resolve, reject) => {
  //   axios.get(options.url)
  //     .then(response => {
  //       // console.log('getReposByUsername .then executing with response: ', response.data[0].id);
  //       // transform the data before i resolve
  //       // response
  //       resolve(response.data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       reject(error);
  //     });
  //   })
*/