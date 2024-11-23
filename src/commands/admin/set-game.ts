// src/commands/admin/set-game.ts

import { ApplicationCommandRegistry, Command } from "@sapphire/framework";

import { ChatInputCommandInteraction } from "discord.js";
import { ServerSettings } from "../../database/enmap.js";
import { hasAdminPermission } from "../../utils/permissions.js";

export default class SetGameCommand extends Command {
  constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      name: "set-game",
      description: "Define who can trigger the /start command.",
    });
  }

  registerApplicationCommands(registry: ApplicationCommandRegistry) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName(this.name)
        .setDescription(this.description)
        .addStringOption((option) =>
          option
            .setName("access")
            .setDescription("Who can start battles?")
            .setRequired(true)
            .addChoices(
              { name: "Everyone", value: "everyone" },
              { name: "Admins Only", value: "admins" },
              { name: "Role-Based", value: "role" }
            )
        )
        .addRoleOption((option) =>
          option
            .setName("role")
            .setDescription("The role allowed to start battles (for Role-Based).")
            .setRequired(false)
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

    const access = interaction.options.getString("access", true);
    const role = interaction.options.getRole("role");
    const guildId = interaction.guildId;

    if (!guildId) {
      await interaction.reply({ content: "❌ Invalid guild ID.", ephemeral: true });
      return;
    }

    const serverSettings = ServerSettings.ensure(guildId, { publicGames: false });

    if (access === "everyone") {
      serverSettings.publicGames = true;
      serverSettings.adminRole = null;
    } else if (access === "admins") {
      serverSettings.publicGames = false;
      serverSettings.adminRole = null;
    } else if (access === "role" && role) {
      serverSettings.publicGames = false;
      serverSettings.adminRole = role.name;
    } else {
      await interaction.reply({ content: "❌ Invalid role configuration.", ephemeral: true });
      return;
    }

    ServerSettings.set(guildId, serverSettings);

    await interaction.reply({
      content: `✅ Game access has been set to **${access}**${role ? ` for role **${role.name}**` : ""}.`,
      ephemeral: true,
    });
  }
}
