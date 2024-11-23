// src/commands/admin/set-timer.ts

import { ApplicationCommandRegistry, Command } from "@sapphire/framework";

import { ChatInputCommandInteraction } from "discord.js";
import { ServerSettings } from "../../database/enmap.js";
import { hasAdminPermission } from "../../utils/permissions.js";

export default class SetTimerCommand extends Command {
  constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      name: "set-timer",
      description: "Set the preparation time before battles start.",
    });
  }

  registerApplicationCommands(registry: ApplicationCommandRegistry) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName(this.name)
        .setDescription(this.description)
        .addIntegerOption((option) =>
          option
            .setName("duration")
            .setDescription("The preparation time in seconds.")
            .setRequired(true)
        )
    );
  }

  async chatInputRun(interaction: ChatInputCommandInteraction) {
    const member = interaction.guild?.members.cache.get(interaction.user.id);
    if (!hasAdminPermission(member)) {
      await interaction.reply({
        content: `❌ You do not have permission to use this command.`,
        ephemeral: true,
      });
      return;
    }

    const duration = interaction.options.getInteger("duration", true);
    const guildId = interaction.guildId;

    if (!guildId) {
      await interaction.reply({ content: "❌ Invalid guild ID.", ephemeral: true });
      return;
    }

    if (duration < 10 || duration > 600) {
      await interaction.reply({
        content: "❌ Duration must be between 10 and 600 seconds.",
        ephemeral: true,
      });
      return;
    }

    const serverSettings = ServerSettings.ensure(guildId, { gameTimer: 120 });
    serverSettings.gameTimer = duration;
    ServerSettings.set(guildId, serverSettings);

    await interaction.reply({
      content: `✅ Preparation time has been set to **${duration} seconds**.`,
      ephemeral: true,
    });
  }
}
