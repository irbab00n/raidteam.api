// Will manage the class data from Warcraft Logs
// Uses the /classes endpoint to retrieve the data
import axios from 'axios';

const consoleKey = '~*~ Warcraft Logs Controller';

const WARCRAFT_LOGS_API_KEY = process.env.WARCRAFT_LOGS_API_KEY;

var classes: any = null;

export const getClasses = () => {
  if (classes !== null) {
    return Promise.resolve(classes);
  }

  const fullLink = `https://www.warcraftlogs.com:443/v1/classes?api_key=${WARCRAFT_LOGS_API_KEY}`;

  return axios
    .get(fullLink)
    .then((results: any) => {
      return results;
    })
    .catch((error: any) => {
      console.error(
        `${consoleKey}: Something went wrong while attempting to fetch character classes from the Warcraft Logs API: `,
        error
      );
    });
};
