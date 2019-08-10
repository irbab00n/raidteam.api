// This module will contain all of the rankings methods
// In this module, we will need to reference both the encounters array
// along with the classes array.  It contains ID-based information for
// encounters and classes at the same time.

/**
 * metric: The metric to query for. Valid fight metrics are 'speed', 'execution' and 'feats'. Valid character metrics are 'dps', 'hps', 'bossdps, 'tankhps', or 'playerspeed'. For WoW only, 'krsi' can be used for tank survivability ranks and 'progress' can be used for guild progress info.
 * size: The raid size to query for. This is only valid for fixed size raids. Raids with flexible sizing must omit this parameter.
 * difficulty: The difficulty setting to query for. Valid difficulty settings are 1 = LFR, 2 = Flex, 3 = Normal, 4 = Heroic, 5 = Mythic, 10 = Challenge Mode, 100 = WildStar/FF. Can be omitted for encounters with only one difficulty setting.
 * partition: The partition group to query for. Most zones have only one partition, and this can be omitted. Hellfire Citadel has two partitions (1 for original, 2 for pre-patch). Highmaul and BRF have two partitions (1 for US/EU, 2 for Asia).
 * class: The class to query for if a character metric is specified. Valid class IDs can be obtained from a /classes API request. Optional.
 * spec: The spec to query for if a character metric is specified. Valid spec IDs can be obtained from a /classes API request. Optional.
 * bracket: The bracket to query for. If omitted or if a value of 0 is specified, then all brackets are examined. Brackets can be obtained from a /zones API request.
 * server: 	A server to filter on. If set, the region must also be specified. This is the slug field in Blizzard terminology.
 * region: The short name of a region to filter on (e.g., US, NA, EU).
 * page: The page to examine, starting from 1. If the value is omitted, then 1 is assumed. For example, with a page of 2 and a limit of 300, you will be fetching rankings 301-600.
 * filter: A search filter string, limiting the search to specific classes, specs, fight durations, raid sizes, etc. The format should match the string used on the public rankings pages. TODO: Investigate what this is, and how to program it
 */

import axios from 'axios';

const WARCRAFT_LOGS_API_KEY = process.env.WARCRAFT_LOGS_API_KEY;

const region = 'US';

export const getRankingsForCharacter = (
  characterName: string,
  realmSlug: string
) => {
  let fullLink = `https://www.warcraftlogs.com:443/v1/rankings/character/${characterName}/${realmSlug}/${region}?api_key=${WARCRAFT_LOGS_API_KEY}`;
  return axios
    .get(fullLink)
    .then(results => {
      console.log(
        '-------- RESULTS from Warcraft Logs Rankings API: ',
        results
      );
      return results.data;
    })
    .catch(error => {
      console.log('~~~~~~~~ ERROR fom Warcraft Logs Rankings API: ', error);
    });
};
