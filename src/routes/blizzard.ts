import * as blizzardController from '../controllers/blizzard';

const routes = [
  {
    verb: 'get',
    endpoint: '/blizzard/character',
    controller: blizzardController.getCharacter,
  },
];

export default routes;
