// src/commands/user/profile.ts

import { ApplicationCommandRegistry, Command } from "@sapphire/framework";

import { ChatInputCommandInteraction } from "discord.js";
import { UserBattleData } from "../../database/enmap.js";
import { createEmbed } from "../../utils/embed.js";

export default class ProfileCommand extends Command {
  constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      name: "profile",
      description: "View your personal stats, inventory, and rank.",
    });
  }

  registerApplicationCommands(registry: ApplicationCommandRegistry) {
    registry.registerChatInputCommand((builder) =>
      builder.setName(this.name).setDescription(this.description)
    );
  }

  async chatInputRun(interaction: ChatInputCommandInteraction) {
    const userId = interaction.user.id;
    const userBattleData = UserBattleData.ensure(userId, {
      wins: 0,
      losses: 0,
      gamesPlayed: 0,
    });

    const embed = createEmbed({
      title: `${interaction.user.username}'s Profile`,
      description: "Your battle statistics and performance summary.",
      fields: [
        { name: "🏆 Wins", value: `${userBattleData.wins}`, inline: true },
        { name: "❌ Losses", value: `${userBattleData.losses}`, inline: true },
        {
          name: "🎮 Games Played",
          value: `${userBattleData.gamesPlayed}`,
          inline: true,
        },
        {
          name: "📈 Win Rate",
          value: `${
            userBattleData.gamesPlayed > 0
              ? `${(
                  (userBattleData.wins / userBattleData.gamesPlayed) *
                  100
                ).toFixed(2)}%`
              : "N/A"
          }`,
          inline: true,
        },
      ],
      footer: {
        text: "Destiny Bot",
        iconURL: interaction.client.user?.displayAvatarURL(),
      },
    });

    await interaction.reply({ embeds: [embed] });
  }
}
