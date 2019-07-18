/*

Shape of the Route object:

{
  verb: String
  endpoint: String
  middleware: TBD
  controller: function
}

*/
// for each collection of route objects, concat them together and export them
const blizzard = require('./blizzard');

let routes = [blizzard].reduce((collected, routes) => collected.concat(routes), []);

module.exports = routes;