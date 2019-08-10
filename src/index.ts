import app from './app';
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`\n     *************************************************`);
  console.log(`    ~*~*~ RaidTeam.app API listening on port ${port} ~*~*~`);
  console.log(`     *************************************************\n`);
});
