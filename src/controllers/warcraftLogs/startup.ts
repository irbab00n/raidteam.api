import { getEncounters } from './encounters';

const warcraftLogsStartUpTag = '~*~ STARTUP: Warcraft Logs Controller ---';

console.log(`${warcraftLogsStartUpTag} Staring the Warcraft Logs Controller`);
console.log(
  `${warcraftLogsStartUpTag} Calling the getEncounters method from the encounters module...`
);
getEncounters().then(results => {
  console.log(
    `${warcraftLogsStartUpTag} Warcraft Logs Zones API queried successfully...`
  );
});
