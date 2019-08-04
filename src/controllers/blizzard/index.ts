import express from 'express'
import axios from 'axios'
import { GetCharacterOptions } from '../../interfaces/Blizzard/Interface.GetCharacterOptions'
import { getToken } from './getToken'
import { blizzard as blizzardApiPaths } from '../../api_paths'

const region = 'us'
const blizzard_api = 'api.blizzard.com'

// converts access token into headers config object for Axios
const createAuthHeaders = (access_token: string) => ({
  headers: {
    Authorization: `Bearer ${access_token}`,
  },
})

const flattenResults = (results: any[]) => {
  return results.reduce((flattened, result) => {
    return Object.assign(flattened, result)
  }, {})
}

const _getCharacterDefaultOptions = {
  verbose: false,
}

// gets the entire character profile, leveraging all
export const getCharacter = (
  request: express.Request,
  response: express.Response,
  options: GetCharacterOptions = _getCharacterDefaultOptions
) => {
  const { characterName, realmSlug } = request.query
  const { verbose } = options

  if (verbose) console.log('~*~*~*~ Running the getCharacter method ~*~*~*~')

  Promise.all([
    getCharacterProfile(characterName, realmSlug),
    getCharacterMedia(characterName, realmSlug),
    getCharacterEquipment(characterName, realmSlug),
    getCharacterRaidProgression(characterName, realmSlug),
    getCharacterSpecialization(characterName, realmSlug),
    getCharacterStatistics(characterName, realmSlug),
  ])
    .then(results => {
      // console.log(' +++++ Results from Promise.all: ', flattenResults(results));
      response.status(200).send(flattenResults(results))
    })
    .catch(errors => {
      console.log(
        ' xxxxx Any Errors that have occurred during Promise.all: ',
        errors
      )
      response.status(400).send(errors)
    })
}

// grabs the access token and gets character profile
export const getCharacterProfile = (
  characterName: string,
  realmSlug: string
) => {
  return getToken({ verbose: true }).then((access_token: string) => {
    let fullLink = `https://${region}.${blizzard_api}/${blizzardApiPaths.character}/${realmSlug}/${characterName}?namespace=profile-us`
    let config = createAuthHeaders(access_token)
    return axios.get(fullLink, config).then(result => {
      return { profile: result.data }
    })
  })
}

// grabs the access token and gets character media
export const getCharacterMedia = (characterName: string, realmSlug: string) => {
  const endpoint = 'character-media'
  return getToken({ verbose: true }).then((access_token: string) => {
    let fullLink = `https://${region}.${blizzard_api}/${blizzardApiPaths.character}/${realmSlug}/${characterName}/${endpoint}?namespace=profile-us`
    let config = createAuthHeaders(access_token)
    return axios.get(fullLink, config).then(result => {
      return { media: result.data }
    })
  })
}

// grabs the access token and gets character equipment
export const getCharacterEquipment = (
  characterName: string,
  realmSlug: string
) => {
  const endpoint = 'equipment'
  return getToken({ verbose: true }).then((access_token: string) => {
    let fullLink = `https://${region}.${blizzard_api}/${blizzardApiPaths.character}/${realmSlug}/${characterName}/${endpoint}?namespace=profile-us`
    let config = createAuthHeaders(access_token)
    return axios.get(fullLink, config).then(result => {
      return { equipment: result.data }
    })
  })
}

// grabs the access token and gets the characters current raid progression
export const getCharacterRaidProgression = (
  characterName: string,
  realmSlug: string
) => {
  // const endpoint = 'raid-progression';
  return getToken({ verbose: true }).then((access_token: string) => {
    // let fullLink = `https://${region}.${blizzard_api}/${blizzardApiPaths.character}/${realmSlug}/${characterName}/${endpoint}?namespace=profile-us`;
    let fullLink = `https://${region}.${blizzard_api}/wow/character/${realmSlug}/${characterName}?fields=progression`
    let config = createAuthHeaders(access_token)
    return axios.get(fullLink, config).then(result => {
      return { progression: result.data.progression }
    })
  })
}

// grabs the access token and gets the character specialization
export const getCharacterSpecialization = (
  characterName: string,
  realmSlug: string
) => {
  const endpoint = 'specializations'
  return getToken({ verbose: true }).then((access_token: string) => {
    let fullLink = `https://${region}.${blizzard_api}/${blizzardApiPaths.character}/${realmSlug}/${characterName}/${endpoint}?namespace=profile-us`
    let config = createAuthHeaders(access_token)
    return axios.get(fullLink, config).then(result => {
      return { specialization: result.data }
    })
  })
}

// grabs the access token and gets character statistics
export const getCharacterStatistics = (
  characterName: string,
  realmSlug: string
) => {
  const endpoint = 'statistics'
  return getToken({ verbose: true }).then((access_token: string) => {
    let fullLink = `https://${region}.${blizzard_api}/${blizzardApiPaths.character}/${realmSlug}/${characterName}/${endpoint}?namespace=profile-us`
    let config = createAuthHeaders(access_token)
    return axios.get(fullLink, config).then(result => {
      return { statistics: result.data }
    })
  })
}

console.log(
  '\nWho dat?\n\nBlizzard controller module reporting in: ',
  this,
  '\n'
)
