const axios = require('axios');
const getToken = require('../../utils/getToken');
const api_paths = require('../../api_paths').blizzard;

const region = 'us';
const blizzard_api = 'api.blizzard.com';

// converts access token into headers config object for Axios
const createAuthHeaders = access_token => ({
  headers: {
    'Authorization': `Bearer ${access_token}`
  }
});

const flattenResults = results => {
  return results.reduce((flattened, result) => {
    return Object.assign(flattened, result);
  }, {});
};

// gets the entire character profile, leveraging all 
module.exports.getCharacter = (request, response) => {
  const { characterName, realmSlug } = request.query;

  console.log('~*~*~*~ Running the getCharacter method ~*~*~*~');

  Promise.all([
    this.getCharacterProfile(characterName, realmSlug),
    this.getCharacterMedia(characterName, realmSlug),
    this.getCharacterEquipment(characterName, realmSlug),
    this.getCharacterRaidProgression(characterName, realmSlug),
    this.getCharacterSpecialization(characterName, realmSlug),
    this.getCharacterStatistics(characterName, realmSlug)
  ])
    .then(results => {
      // console.log(' +++++ Results from Promise.all: ', flattenResults(results));
      response.status(200).send(flattenResults(results));
    })
    .catch(errors => {
      console.log(' xxxxx Any Errors that have occurred during Promise.all: ', errors);
      response.status(400).send(errors);
    });
};

// grabs the access token and gets character profile
module.exports.getCharacterProfile = (characterName, realmSlug) => {
  return getToken({verbose: true}).then(access_token => {
    let fullLink = `https://${region}.${blizzard_api}/${api_paths.character}/${realmSlug}/${characterName}?namespace=profile-us`;
    let config = createAuthHeaders(access_token);
    return axios.get(fullLink, config)
      .then(result => {
        return {profile: result.data};
      });
  });
};

// grabs the access token and gets character media
module.exports.getCharacterMedia = (characterName, realmSlug) => {
  const endpoint = 'character-media';
  return getToken({verbose: true}).then(access_token => {
    let fullLink = `https://${region}.${blizzard_api}/${api_paths.character}/${realmSlug}/${characterName}/${endpoint}?namespace=profile-us`;
    let config = createAuthHeaders(access_token);
    return axios.get(fullLink, config)
      .then(result => {
        return {media: result.data};
      });
  })
};

// grabs the access token and gets character equipment
module.exports.getCharacterEquipment = (characterName, realmSlug) => {
  const endpoint = 'equipment';
  return getToken({verbose: true}).then(access_token => {
    let fullLink = `https://${region}.${blizzard_api}/${api_paths.character}/${realmSlug}/${characterName}/${endpoint}?namespace=profile-us`;
    let config = createAuthHeaders(access_token);
    return axios.get(fullLink, config)
      .then(result => {
        return {equipment: result.data};
      });
  })
};

// grabs the access token and gets the characters current raid progression
module.exports.getCharacterRaidProgression = (characterName, realmSlug) => {
  const endpoint = 'raid-progression';
  return getToken({verbose: true}).then(access_token => {
    
    // let fullLink = `https://${region}.${blizzard_api}/${api_paths.character}/${realmSlug}/${characterName}/${endpoint}?namespace=profile-us`;
    let fullLink = `https://us.api.blizzard.com/wow/character/${realmSlug}/${characterName}?fields=progression`
    let config = createAuthHeaders(access_token);
    return axios.get(fullLink, config)
      .then(result => {
        return {'progression': result.data.progression};
      });
  })
};

// grabs the access token and gets the character specialization
module.exports.getCharacterSpecialization = (characterName, realmSlug) => {
  const endpoint = 'specializations';
  return getToken({verbose: true}).then(access_token => {
    let fullLink = `https://${region}.${blizzard_api}/${api_paths.character}/${realmSlug}/${characterName}/${endpoint}?namespace=profile-us`;
    let config = createAuthHeaders(access_token);
    return axios.get(fullLink, config)
      .then(result => {
        return {specialization: result.data};
      });
  })
};

// grabs the access token and gets character statistics
module.exports.getCharacterStatistics = (characterName, realmSlug) => {
  const endpoint = 'statistics';
  return getToken({verbose: true}).then(access_token => {
    let fullLink = `https://${region}.${blizzard_api}/${api_paths.character}/${realmSlug}/${characterName}/${endpoint}?namespace=profile-us`;
    let config = createAuthHeaders(access_token);
    return axios.get(fullLink, config)
      .then(result => {
        return {statistics: result.data};
      });
  })
};

console.log('\nWho dat?\n\nBlizzard controller module reporting in: ', this, '\n');