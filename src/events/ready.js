const { ActivityType } = require("discord.js");
const { token } = require("../config.json");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const rest = new REST({ version: "10" }).setToken(token);
module.exports = {
  name: "ready",
  async execute(client) {
    try {
      await rest.put(Routes.applicationCommands(client.user.id), {
        body: client.commands,
      });
    } catch (error) {
      console.error(error);
    }
    client.user.setStatus("online"); //dnd= donotdisturb
    client.user.setActivity("Testing...", {
      type: ActivityType.Custom,
    });
    console.log(`${client.user.username} is online!`);
  },
};
