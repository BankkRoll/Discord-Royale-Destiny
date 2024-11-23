import Enmap from "enmap";

/**
 * @typedef {Object} UserBattleDataSchema
 * @property {number} wins - Total wins for the user.
 * @property {number} losses - Total losses for the user.
 * @property {number} gamesPlayed - Total games played by the user.
 */

/**
 * UserBattleData Enmap
 * Stores user-specific battle statistics.
 *
 * **Key**: User ID (string)
 * **Value**: {@link UserBattleDataSchema}
 *
 * Example:
 * ```json
 * {
 *   "wins": 5,
 *   "losses": 3,
 *   "gamesPlayed": 8
 * }
 * ```
 */
export const UserBattleData = new Enmap({
  name: "userBattleData",
  ensureProps: true,
  fetchAll: true,
  dataDir: "./data",
  autoEnsure: { wins: 0, losses: 0, gamesPlayed: 0 },
});

/**
 * @typedef {Object} GameSessionSchema
 * @property {string} era - The era the game is set in.
 * @property {Array<string>} participants - List of user IDs currently in the game.
 * @property {boolean} active - Whether the game is ongoing.
 * @property {number} timer - The countdown time for the game to start.
 * @property {Array<{ attacker: string, target: string, outcome: string }>} logs - Record of battle actions during the game.
 */

/**
 * GameSession Enmap
 * Tracks the state of an ongoing game.
 *
 * **Key**: Game ID (string)
 * **Value**: {@link GameSessionSchema}
 *
 * Example:
 * ```json
 * {
 *   "era": "medieval",
 *   "participants": ["123456789012345678", "987654321098765432"],
 *   "active": true,
 *   "timer": 120,
 *   "logs": [
 *     { "attacker": "123456789012345678", "target": "987654321098765432", "outcome": "50 damage" }
 *   ]
 * }
 * ```
 */
export const GameSession = new Enmap({
  name: "gameSession",
  ensureProps: true,
  fetchAll: true,
  dataDir: "./data",
  autoEnsure: { era: null, participants: [], active: false, timer: 0, logs: [] },
});

/**
 * @typedef {Object} ServerSettingsSchema
 * @property {string} defaultEra - The default era for battles.
 * @property {number} gameTimer - Default countdown timer for game preparation.
 * @property {string|null} winningRole - Role assigned to the winner of a battle (optional).
 * @property {boolean} publicGames - Whether games can be started by everyone or restricted to admins.
 */

/**
 * ServerSettings Enmap
 * Stores server-specific configurations for Destiny.
 *
 * **Key**: Server ID (string)
 * **Value**: {@link ServerSettingsSchema}
 *
 * Example:
 * ```json
 * {
 *   "defaultEra": "modern",
 *   "gameTimer": 120,
 *   "winningRole": "Champion",
 *   "publicGames": false
 * }
 * ```
 */
export const ServerSettings = new Enmap({
  name: "serverSettings",
  ensureProps: true,
  fetchAll: true,
  dataDir: "./data",
  autoEnsure: {
    defaultEra: "classic",
    gameTimer: 120,
    winningRole: null,
    publicGames: false,
  },
});

/**
 * @typedef {Object} LeaderboardEntrySchema
 * @property {string} user - The ID of the user.
 * @property {number} wins - Total number of wins for the user.
 * @property {number} losses - Total number of losses for the user.
 */

/**
 * LeaderboardData Enmap
 * Stores leaderboard rankings based on total wins and losses.
 *
 * **Key**: Server ID (string)
 * **Value**: Array<{@link LeaderboardEntrySchema}>
 *
 * Example:
 * ```json
 * [
 *   { "user": "123456789012345678", "wins": 10, "losses": 3 },
 *   { "user": "987654321098765432", "wins": 7, "losses": 5 }
 * ]
 * ```
 */
export const LeaderboardData = new Enmap({
  name: "leaderboardData",
  ensureProps: true,
  fetchAll: true,
  dataDir: "./data",
});
