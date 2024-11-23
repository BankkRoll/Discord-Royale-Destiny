// src\index.ts
import "dotenv/config";

import { ActivityType, GatewayIntentBits } from "discord.js";

import { Logger } from "./utils/logger.js";
import { SapphireClient } from "@sapphire/framework";

const client = new SapphireClient({
  intents: [
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ],
  loadMessageCommandListeners: true,
});

client
  .login(process.env.DISCORD_BOT_TOKEN)
  .then(() => {
    Logger.info("Destiny bot successfully logged in.");
    setDynamicActivity();
  })
  .catch((error) => {
    Logger.error("Failed to log in to Destiny bot.", {
      error: error.message,
      stack: error.stack,
    });
  });

function setDynamicActivity() {
  const activities = [
    {
      type: ActivityType.Playing,
      name: `with ${client.guilds.cache.size} servers on Destiny`,
    },
    {
      type: ActivityType.Listening,
      name: `to feedback from ${client.users.cache.size} users`,
    },
    {
      type: ActivityType.Watching,
      name: `over ${client.channels.cache.size} channels`,
    },
    {
      type: ActivityType.Competing,
      name: `in ${client.guilds.cache.size} server challenges`,
    },
  ];

  let index = 0;

  setInterval(() => {
    const activity = activities[index % activities.length];
    client.user?.setActivity(activity.name, { type: activity.type });
    index++;
  }, 10000);
}

export default client;
