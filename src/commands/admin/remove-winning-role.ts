// src/commands/admin/remove-winning-role.ts

import { ApplicationCommandRegistry, Command } from "@sapphire/framework";

import { ChatInputCommandInteraction } from "discord.js";
import { ServerSettings } from "../../database/enmap.js";
import { hasAdminPermission } from "../../utils/permissions.js";

export default class RemoveWinningRoleCommand extends Command {
  constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      name: "remove-winning-role",
      description: "Remove the role assigned to winners of battles.",
    });
  }

  registerApplicationCommands(registry: ApplicationCommandRegistry) {
    registry.registerChatInputCommand((builder) =>
      builder.setName(this.name).setDescription(this.description)
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

    const guildId = interaction.guildId;

    if (!guildId) {
      await interaction.reply({ content: "❌ Invalid guild ID.", ephemeral: true });
      return;
    }

    const serverSettings = ServerSettings.ensure(guildId, { winningRole: null });

    if (!serverSettings.winningRole) {
      await interaction.reply({
        content: `❌ No winning role is currently set.`,
        ephemeral: true,
      });
      return;
    }

    serverSettings.winningRole = null;
    ServerSettings.set(guildId, serverSettings);

    await interaction.reply({
      content: `✅ The winning role has been successfully removed.`,
      ephemeral: true,
    });
  }
}
