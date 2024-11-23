// src/commands/user/start.ts

import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  ComponentType,
} from "discord.js";
import { ApplicationCommandRegistry, Command } from "@sapphire/framework";
import {
  GameSession,
  ServerSettings,
  UserBattleData,
} from "../../database/enmap.js";

import { Eras } from "../../utils/game.js";
import { createEmbed } from "../../utils/embed.js";

export default class StartCommand extends Command {
  constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      name: "start",
      description: "Start a new battle in a specified era.",
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
            .setDescription("The era for the battle (optional).")
            .setRequired(false)
            .addChoices(
              ...Eras.map((era) => ({
                name: era.name,
                value: era.name.toLowerCase(),
              }))
            )
        )
    );
  }

  async chatInputRun(interaction: ChatInputCommandInteraction) {
    const guildId = interaction.guildId;

    if (!guildId) {
      await interaction.reply({
        content: "❌ Invalid guild ID.",
        ephemeral: true,
      });
      return;
    }

    const currentSession = GameSession.get(guildId);
    if (currentSession?.active) {
      await interaction.reply({
        content:
          "❌ A game is already in progress. Please wait for it to finish.",
        ephemeral: true,
      });
      return;
    }

    const serverSettings = ServerSettings.ensure(guildId, {
      defaultEra: "classic",
      gameTimer: 60,
      winningRole: null,
      publicGames: false,
    });
    const selectedEra =
      interaction.options.getString("era") ||
      serverSettings.defaultEra.toLowerCase();
    const era = Eras.find((e) => e.name.toLowerCase() === selectedEra);

    if (!era) {
      await interaction.reply({
        content: `❌ Era "${selectedEra}" not found. Available eras: ${Eras.map(
          (e) => e.name
        ).join(", ")}`,
        ephemeral: true,
      });
      return;
    }

    const timer = serverSettings.gameTimer;
    GameSession.set(guildId, {
      era: era.name,
      participants: [],
      active: true,
      logs: [],
    });

    const progressSquares = (percent: number) => {
      const totalSquares = 10;
      const greenSquares = Math.floor((percent / 100) * totalSquares);
      const whiteSquares = totalSquares - greenSquares;
      return "🟩".repeat(greenSquares) + "⬜".repeat(whiteSquares);
    };

    let countdown = timer;
    const participants: string[] = [];
    const embed = createEmbed({
      title: "🚀 Battle Starting Soon!",
      description: `Era: **${era.name}**\n\nPlayers can join by clicking the button below.`,
      fields: [
        { name: "Players", value: "None yet! Click the button to join." },
        {
          name: "Countdown",
          value: `${progressSquares(0)}\n**0%** | ${countdown} seconds`,
        },
      ],
    });

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId("join-game")
        .setLabel("Join Game")
        .setStyle(ButtonStyle.Success)
    );

    const message = await interaction.reply({
      embeds: [embed],
      components: [row],
      fetchReply: true,
    });

    const collector = message.createMessageComponentCollector({
      componentType: ComponentType.Button,
      time: timer * 1000,
    });

    collector.on("collect", async (buttonInteraction) => {
      const userId = buttonInteraction.user.id;
      if (!participants.includes(userId)) {
        participants.push(userId);
      }

      const updatedEmbed = createEmbed({
        title: "🚀 Battle Starting Soon!",
        description: `Era: **${era.name}**`,
        fields: [
          {
            name: "Players",
            value:
              participants.map((id) => `<@${id}>`).join(", ") || "None yet!",
          },
          {
            name: "Countdown",
            value: `${progressSquares((countdown / timer) * 100)}\n**${Math.round(
              (countdown / timer) * 100
            )}%** | ${countdown} seconds`,
          },
        ],
      });

      await buttonInteraction.update({ embeds: [updatedEmbed] });
    });

    const countdownInterval = setInterval(async () => {
      countdown -= 10;
      if (countdown <= 0) {
        clearInterval(countdownInterval);
        collector.stop();
        return;
      }

      const updatedEmbed = createEmbed({
        title: "🚀 Battle Starting Soon!",
        description: `Era: **${era.name}**`,
        fields: [
          {
            name: "Players",
            value:
              participants.map((id) => `<@${id}>`).join(", ") || "None yet!",
          },
          {
            name: "Countdown",
            value: `${progressSquares((countdown / timer) * 100)}\n**${Math.round(
              (countdown / timer) * 100
            )}%** | ${countdown} seconds`,
          },
        ],
      });

      await interaction.editReply({ embeds: [updatedEmbed] });
    }, 10000);

    collector.on("end", async () => {
      if (participants.length < 2) {
        GameSession.delete(guildId);
        await interaction.editReply({
          content: "❌ Not enough players to start the battle.",
          embeds: [],
          components: [],
        });
        return;
      }

      const logs: string[] = [];
      while (participants.length > 1) {
        const attackerIndex = Math.floor(Math.random() * participants.length);
        let defenderIndex = Math.floor(Math.random() * participants.length);
        while (attackerIndex === defenderIndex) {
          defenderIndex = Math.floor(Math.random() * participants.length);
        }

        const attacker = participants[attackerIndex];
        const defender = participants[defenderIndex];
        const attackItem = era.items.filter((i) => i.type === "attack")[
          Math.floor(
            Math.random() * era.items.filter((i) => i.type === "attack").length
          )
        ];
        const defenseItem = era.items.filter((i) => i.type === "defense")[
          Math.floor(
            Math.random() * era.items.filter((i) => i.type === "defense").length
          )
        ];

        const attackPhrase = era.attackPhrases[
          Math.floor(Math.random() * era.attackPhrases.length)
        ]
          .replace("{attacker}", `<@${attacker}>`)
          .replace("{defender}", `<@${defender}>`)
          .replace("{item}", attackItem.name);

        const defensePhrase = era.defensePhrases[
          Math.floor(Math.random() * era.defensePhrases.length)
        ]
          .replace("{defender}", `<@${defender}>`)
          .replace("{item}", defenseItem.name);

        logs.push(attackPhrase);
        logs.push(defensePhrase);

        participants.splice(defenderIndex, 1);

        const updatedEmbed = createEmbed({
          title: "⚔️ Battle in Progress!",
          description: `Era: **${era.name}**`,
          fields: [
            { name: "Remaining Players", value: participants.join(", ") },
            { name: "Battle Logs", value: logs.slice(-10).join("\n") },
          ],
        });

        await interaction.editReply({ embeds: [updatedEmbed] });
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }

      const winner = participants[0];
      const winnerMessage = `<@${winner}> is the champion of the **${era.name}** era!`;

      const finalEmbed = createEmbed({
        title: "🏆 Battle Over!",
        description: winnerMessage,
        fields: [{ name: "Battle Logs", value: logs.join("\n") }],
      });

      GameSession.delete(guildId);
      await interaction.editReply({ embeds: [finalEmbed], components: [] });

      const userData = UserBattleData.ensure(winner, {
        wins: 0,
        losses: 0,
        gamesPlayed: 0,
      });
      userData.wins += 1;
      userData.gamesPlayed += 1;
      UserBattleData.set(winner, userData);
    });
  }
}
