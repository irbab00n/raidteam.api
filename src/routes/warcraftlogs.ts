import * as warcraftLogsController from '../controllers/warcraftLogs';

const routes = [
  {
    verb: 'get',
    endpoint: '/warcraftlogs/rankings/character',
    controller: warcraftLogsController.getCharacterRankings,
  },
];

export default routes;
