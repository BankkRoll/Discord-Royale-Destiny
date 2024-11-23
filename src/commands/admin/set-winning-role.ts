// src/commands/admin/set-winning-role.ts

import { ApplicationCommandRegistry, Command } from "@sapphire/framework";

import { ChatInputCommandInteraction } from "discord.js";
import { ServerSettings } from "../../database/enmap.js";
import { hasAdminPermission } from "../../utils/permissions.js";

export default class SetWinningRoleCommand extends Command {
  constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      name: "set-winning-role",
      description: "Assign a role to players who win battles.",
    });
  }

  registerApplicationCommands(registry: ApplicationCommandRegistry) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName(this.name)
        .setDescription(this.description)
        .addRoleOption((option) =>
          option
            .setName("role")
            .setDescription("The role to assign to winners.")
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

    const role = interaction.options.getRole("role");
    const guildId = interaction.guildId;

    if (!guildId || !role) {
      await interaction.reply({ content: "❌ Invalid guild ID or role.", ephemeral: true });
      return;
    }

    const serverSettings = ServerSettings.ensure(guildId, { winningRole: null });
    serverSettings.winningRole = role.id;
    ServerSettings.set(guildId, serverSettings);

    await interaction.reply({
      content: `✅ Winning role has been set to **${role.name}**.`,
      ephemeral: true,
    });
  }
}
