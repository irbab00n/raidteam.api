import { AuthToken } from '../../interfaces/Blizzard/Interface.AuthToken';
import { GetTokenOptions } from '../../interfaces/Blizzard/Interface.GetTokenOptions';
import credentials from '../../templates/blizzard_credentials';

const oauth2 = require("simple-oauth2").create(credentials);

const _defaultOptions: GetTokenOptions = {
  verbose: true
};

var token: null | {[key: string]: any} = null;

export const getToken = ({ verbose }: GetTokenOptions = _defaultOptions) => {
  // If running in verbose mode, log the verbose startup
  if (verbose) {
    console.log('-------------------------------------------- \n');
    console.log('~*~ Blizzard Controller: getToken module --- running... \n');
    console.log('-------------------------------------------- \n');
    console.log('~*~ Blizzard Controller: getToken module --- Current State of the token:\n\n', token, '\n');
  };
  // If the token is null or it has expired
  if (token === null || token.expired()) {
    // If running in verbose mode, log the verbose action
    if (verbose) {
      console.log('-------------------------------------------- \n');
      console.log('~*~ Blizzard Controller: getToken module --- Token is either null or it has expired... \n');
      console.log('~*~ Blizzard Controller: getToken module --- Attempting to now retreive a new token... \n');
      console.log('-------------------------------------------- \n');
    }
    // Returns the result of an async call to get the client credentials where
    // oauth creates an access token, and then sets the module token storage to
    // the access token that returns from the oauth token
    return oauth2.clientCredentials
      .getToken()
        .then(oauth2.accessToken.create)
        .then((newToken: AuthToken) => {
          if (verbose) {
            console.log('-------------------------------------------- \n');
            console.log('~*~ Blizzard Controller: getToken module --- Token retreived successfully from Blizzard oauth protocol:\n\n', newToken, '\n');
            console.log('-------------------------------------------- \n');
          };
          token = newToken;
          return newToken.token.access_token;
        })
        .catch((error: any) => {
          console.log('***** Something went wrong fetching the access token:\n\n', error, '\n\n');
        });
  } else {
    console.log('-------------------------------------------- \n');
    console.log('~*~ Blizzard Controller: getToken module --- A token exists already and it is not expired; returning it directly to the user \n');
    console.log('-------------------------------------------- \n');
    return Promise.resolve(token.token.access_token);
  }
};