// src/commands/user/leaderboard.ts

import { ApplicationCommandRegistry, Command } from "@sapphire/framework";
import { LeaderboardData, UserBattleData } from "../../database/enmap.js";

import { ChatInputCommandInteraction } from "discord.js";
import { createEmbed } from "../../utils/embed.js";

export default class LeaderboardCommand extends Command {
  constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      name: "leaderboard",
      description: "View the top players in the server.",
    });
  }

  registerApplicationCommands(registry: ApplicationCommandRegistry) {
    registry.registerChatInputCommand((builder) =>
      builder.setName(this.name).setDescription(this.description)
    );
  }

  async chatInputRun(interaction: ChatInputCommandInteraction) {
    const guildId = interaction.guildId;

    if (!guildId) {
      await interaction.reply({
        content: "❌ This command can only be used in a server.",
        ephemeral: true,
      });
      return;
    }

    const allBattleData = Array.from(UserBattleData.entries());
    const leaderboard = allBattleData
      .filter(([_, data]) => data.wins > 0 || data.losses > 0)
      .sort(([, a], [, b]) => b.wins - a.wins)
      .slice(0, 10);

    if (leaderboard.length === 0) {
      await interaction.reply({
        content: "❌ No leaderboard data available for this server.",
        ephemeral: true,
      });
      return;
    }

    const fields = leaderboard.map(([userId, data], index) => ({
      name: `#${index + 1} - <@${userId}>`,
      value: `🏆 Wins: ${data.wins} | ❌ Losses: ${data.losses}`,
      inline: false,
    }));

    const embed = createEmbed({
      title: `${interaction.guild?.name} Leaderboard`,
      description: "Top players based on total wins.",
      fields,
      footer: {
        text: "Destiny Bot Leaderboard",
        iconURL: interaction.client.user?.displayAvatarURL(),
      },
    });

    await interaction.reply({ embeds: [embed] });
  }
}
