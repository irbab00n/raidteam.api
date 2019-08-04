import { AuthToken } from '../../interfaces/Blizzard/Interface.AuthToken'
import { getToken } from './getToken'

const blizzardStartUpTag = '~*~ STARTUP: Blizzard Controller ---'

console.log(`${blizzardStartUpTag} Staring the blizzard controller`)

getToken().then((newToken: AuthToken) => {
  console.log(
    `${blizzardStartUpTag} Retrieving the OAuth token for the Blizzard API succeeded: ${newToken}\n\n`
  )
})
