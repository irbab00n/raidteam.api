const credentials = require('../templates/blizzard_credentials');
const oauth2 = require("simple-oauth2").create(credentials);

// console.log('credentials: ', credentials, '\n\n');

const _default = {
  verbose: false
};

var token = null;

module.exports = ({ verbose } = _default) => {

  if (verbose) console.log('  getToken --- running... \n\n');

  if (token === null || token.expired()) {
    return oauth2.clientCredentials
      .getToken()
      .then(oauth2.accessToken.create)
      .then(newToken => {
        if (verbose) console.log('Token retreived successfully from Blizzard oauth protocol: ', newToken, '\n\n');
        token = newToken;
        return newToken.token.access_token;
      })
      .catch(error => {
        console.log('Something went wrong fetching the access token: ', error, '\n\n');
      });
  } else {
    return Promise.resolve(token.token.access_token);
  }
};