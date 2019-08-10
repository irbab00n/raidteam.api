// Will manage the class data from Warcraft Logs
// Uses the /classes endpoint to retrieve the data
// Data retrieved in this module can be extracted and used to find data within
// other Warcraft Logs API calls.
// The ID for each class is supposed to be used to find class specific rankings
import axios from 'axios';
import { ClassesEntry } from '../../interfaces/WarcraftLogs/Interface.ClassesEntry';

const WARCRAFT_LOGS_API_KEY = process.env.WARCRAFT_LOGS_API_KEY;

const consoleKey = '~*~ Warcraft Logs Controller';

export var classes: any = null;

/**
 * @async
 * @function getClasses
 * @description
 * <Promise>
 * Will manage the module storage for classes information provided by the Warcraft Logs API.
 *
 * If the classes haven't been retrieved yet, this method will fetch them from the API, store them,
 * and then returns the list of class information to wherever the method was invoked.
 *
 * @returns <Promise> List of class entries from the /classes endpoint of the Warcraft Logs API
 */
export const getClasses = () => {
  console.log(
    `${consoleKey}: getClasses --- FETCHING CLASS DATA FROM WARCRAFT LOGS...`
  );
  if (classes !== null) {
    return Promise.resolve(classes);
  }

  const fullLink = `https://www.warcraftlogs.com:443/v1/classes?api_key=${WARCRAFT_LOGS_API_KEY}`;

  return axios
    .get(fullLink)
    .then((results: any) => {
      classes = results.data;
      return results.data;
    })
    .catch((error: any) => {
      console.error(
        `${consoleKey}: Something went wrong while attempting to fetch character classes from the Warcraft Logs API: `,
        error
      );
    });
};

export const findClassByProperty = (
  target: number | string,
  property: string
) => {
  let wherePropertyEqualsTarget = (wowClass: ClassesEntry) => {
    return wowClass[property] === target;
  };

  if (!Array.isArray(classes)) {
    return getClasses().then(results => {
      return results.find(wherePropertyEqualsTarget);
    });
  }

  return Promise.resolve(classes.find(wherePropertyEqualsTarget));
};
