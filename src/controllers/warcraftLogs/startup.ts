import { getEncounters } from './encounters';
import { getClasses } from './classes';

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

console.log(
  `${warcraftLogsStartUpTag} Calling the getClasses method from the classes module...`
);
getClasses().then(results => {
  console.log(
    `${warcraftLogsStartUpTag} Warcraft Logs Classes API queried successfully...`
  );
});
