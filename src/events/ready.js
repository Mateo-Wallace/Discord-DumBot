export default async (client) => {
  console.log(
    `Logged in as ${client.user.username}\n-> Ready on ${client.guilds.cache.size} servers for a total of ${client.users.cache.size} users`,
  );
  client.user.setActivity(client.config.app.playing);
};
