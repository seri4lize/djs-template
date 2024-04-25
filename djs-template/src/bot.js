const {
  Client,
  IntentsBitField,
  Collection,
  ActivityType,
  Events,
} = require("discord.js");
const { readdirSync } = require("fs");
const { token } = require("./config.json");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const rest = new REST({ version: "10" }).setToken(token);
const fs = require("fs");
const path = require("path");
const client = new Client({
  disableEveryone: true,
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});
module.exports = client;

client.commands = new Collection();
const commandFiles = readdirSync("./commands").filter((file) =>
  file.endsWith(".js")
);
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
  console.log(`>   COMMAND => ${file} ✅`);
}
const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.name) {
    client.on(event.name, (...args) => event.execute(...args, client));
    console.log(`>   EVENT => ${event.name} ✅`);
  }
}
process.on("unhandledRejection", (error) => {
  console.error("[Anti-Crash]:", error);
});

client.login(token);
