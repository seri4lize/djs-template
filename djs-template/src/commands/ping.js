const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  name: "ping",
  description: "Replies with Pong!",
  async execute(interaction, client) {
    await interaction.reply("Pong!");
  },
};
