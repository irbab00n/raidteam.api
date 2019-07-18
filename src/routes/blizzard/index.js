const blizzardController = require('../../controllers/blizzard');

module.exports = [
  {
    verb: 'get',
    endpoint: '/blizzard/character',
    controller: blizzardController.getCharacter
  },
];