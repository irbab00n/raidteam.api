const app = require('./app');
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(` ~*~ RaidTeam.app API listening on port ${port} ~*~\n\n`);
});