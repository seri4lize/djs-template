module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;
    try {
      await command.execute(interaction, client);
    } catch (error) {
      console.error("[Anti-Crash]:", error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "Komutu çalıştırırken bir sorun oldu!",
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: "Komutu çalıştırırken bir sorun oldu!",
          ephemeral: true,
        });
      }
    }
  },
};
