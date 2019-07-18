module.exports = {
  client: {
    id: process.env.BLIZZARD_CLIENT_ID,
    secret: process.env.BLIZZARD_CLIENT_SECRET
  },
  auth: {
    tokenHost: "https://us.battle.net"
  }
};