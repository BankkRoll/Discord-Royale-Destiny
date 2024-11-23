// src/commands/admin/set-era.ts

import { ApplicationCommandRegistry, Command } from "@sapphire/framework";

import { ChatInputCommandInteraction } from "discord.js";
import { ServerSettings } from "../../database/enmap.js";
import { hasAdminPermission } from "../../utils/permissions.js";

export default class SetEraCommand extends Command {
  constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      name: "set-era",
      description: "Set the default era for battles.",
    });
  }

  registerApplicationCommands(registry: ApplicationCommandRegistry) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName(this.name)
        .setDescription(this.description)
        .addStringOption((option) =>
          option
            .setName("era")
            .setDescription("The default era for battles.")
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

    const era = interaction.options.getString("era", true);
    const guildId = interaction.guildId;

    if (!guildId) {
      await interaction.reply({ content: "❌ Invalid guild ID.", ephemeral: true });
      return;
    }

    const serverSettings = ServerSettings.ensure(guildId, { defaultEra: "classic" });
    serverSettings.defaultEra = era;
    ServerSettings.set(guildId, serverSettings);

    await interaction.reply({
      content: `✅ Default era has been set to **${era}**.`,
      ephemeral: true,
    });
  }
}
