import { AuthToken } from '../../interfaces/Blizzard/Interface.AuthToken';
import { getToken } from './getToken';

const blizzardStartUpTag = '~*~ STARTUP: Blizzard Controller ---';

console.log(`${blizzardStartUpTag} Staring the blizzard controller`);
console.log(
  `${blizzardStartUpTag} Initializing the getToken module... Attempting to retrieve token...`
);
getToken().then((newToken: AuthToken) => {
  console.log(
    `${blizzardStartUpTag} Retrieving the OAuth token for the Blizzard API succeeded:\n\n${newToken}\n`
  );
});
