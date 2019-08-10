// WIll manage all of the encounters data for the Warcraft Logs controller module
// Use the /zones API endpoint to be able to find all of the encounter information for each one of the dungeons
import axios from 'axios';

const consoleKey = '~*~ Warcraft Logs Controller';

const WARCRAFT_LOGS_API_KEY = process.env.WARCRAFT_LOGS_API_KEY;

// TODO define the types for encounters
export var encounters: any = null;

export const getEncounters = () => {
  // if the encounters have already been retrieved, return them
  if (encounters !== null) {
    console.log(
      `${consoleKey}: getEncounters --- Zones data has already been retrieved, returning them directly...`
    );
    return Promise.resolve(encounters);
  }

  const fullLink = `https://www.warcraftlogs.com:443/v1/zones?api_key=${WARCRAFT_LOGS_API_KEY}`;
  return axios
    .get(fullLink)
    .then((results: any) => {
      return results.data;
    })
    .catch((error: any) => {
      console.error(
        `Something went wrong while attempting to retrieve the Zones from the Warcraft Logs API: `,
        error
      );
    });
};
