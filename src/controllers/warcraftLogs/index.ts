const axios = require("axios");

// TODO: If we go to support mult-regions, we will need to change this later on
const _region = "US";
const apiBase = "https://www.warcraftlogs.com:443/v1";
const apiKey = process.env.WARCRAFT_LOGS_API_KEY;

// available API's
// API BAsE = https://www.warcraftlogs.com:443/v1

// PARSES
// endpoint /parses/character/{characterName}/{realmSlug}/{region}?api_key=a021801b56262bb5bfc9e527c2f773ab
/*
  Possible Functionality: 

    - Get all character parses for the current raid:
      -- By omitting the specific encounterID, we can get a list of all parses the character currently has for the whole raid
      -- We can surface current progression logs based off of this

    - Get all character parses for specific encounters:
      -- For those that want clear visibility for each boss, for each difficulty, we will need to be able to support allowing the front end to specify which encounter it wants to see, and which of the difficulties it needs to select

  Parameters

    REQUIRED 
    --------

    - characterName	-- The name of the character to collect rankings for.	path	string
    - serverName -- The server that the character is found on. For World of Warcraft this is the 'slug' field returned from their realm status API.	path	string
    - serverRegion -- The short region name for the server on which the character is located: US, EU, KR, TW, CN.	path	string

    OPTIONAL
    --------

    - zone -- The zone to fetch rankings for. If omitted, the latest open raid zone is used.	query	string

      This will allow us to use a Zone ID to specify which raid we want to fetch the parses from

      On the frontend, we can use the list of encounters to select a zone that we want to view

    - encounter	-- An encounter within the zone to fetch rankings for. If omitted, all encounters in the zone will be checked.	query	string

      This will allow us to use an encounter ID to specify which enounter we want to fetch parses for

      This may require some special error handling on the server portion to discern between a failed query and one that returned no results`

    - metric -- The metric to query for. Valid character metrics are 'dps', 'hps', 'bossdps, 'tankhps', or 'playerspeed'. For WoW only, 'krsi' can be used for tank survivability ranks.	query	string
    - bracket	-- The bracket to query for. If omitted or if a value of 0 is specified, then all brackets are examined. Brackets can be obtained from a /zones API request.	query	integer
    - partition	-- The partition group to query for. Most zones have only one partition, and this can be omitted. Hellfire Citadel has two partitions (1 for original, 2 for pre-patch). Highmaul and BRF have two partitions (1 for US/EU, 2 for Asia).	query	integer
    - timeframe -- Whether to compare against today's rankings or to return historical information (where the rank was back when it was earned. The accepted values are 'today' and 'historical', with the default being 'today'.
*/

// get encounters
// retrieves the encounters for the front end to use within the UI

// Character
// Get all ranks by encounter ID
// Get all ranks across all encounters

// Guild
// Get all reports for guild by encounter ID
