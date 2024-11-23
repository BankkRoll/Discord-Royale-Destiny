// src/utils/game.ts

export type GameItem = {
  name: string;
  type: "attack" | "defense";
};

export type GameEra = {
  name: string;
  items: GameItem[];
  attackPhrases: string[]; // Phrases for attacks
  defensePhrases: string[]; // Phrases for defenses
};

export const Eras: GameEra[] = [
  {
    name: "Classic",
    items: [
      // Attack Items
      { name: "Rusty Sword", type: "attack" },
      { name: "Hunting Bow", type: "attack" },
      { name: "Iron Spear", type: "attack" },
      { name: "Battle Axe", type: "attack" },
      { name: "Spiked Club", type: "attack" },
      // Defense Items
      { name: "Wooden Shield", type: "defense" },
      { name: "Leather Armor", type: "defense" },
      { name: "Reinforced Helm", type: "defense" },
      { name: "Stone Barricade", type: "defense" },
      { name: "Bronze Shield", type: "defense" },
    ],
    attackPhrases: [
      "{attacker} slashed {defender} with a {item}.",
      "{attacker} struck {defender} with their {item}.",
      "{attacker} hurled their {item} at {defender}.",
      "{attacker} charged {defender} wielding a {item}.",
      "{attacker} swung their {item} at {defender}.",
    ],
    defensePhrases: [
      "{defender} blocked the strike with their {item}.",
      "{defender} deflected the blow using a {item}.",
      "{defender} took cover behind their {item}.",
      "{defender} braced for impact with their {item}.",
      "{defender}'s {item} absorbed the attack.",
    ],
  },
  {
    name: "Modern",
    items: [
      // Attack Items
      { name: "Combat Knife", type: "attack" },
      { name: "Handgun", type: "attack" },
      { name: "Assault Rifle", type: "attack" },
      { name: "Molotov Cocktail", type: "attack" },
      { name: "Tactical Baton", type: "attack" },
      // Defense Items
      { name: "Kevlar Vest", type: "defense" },
      { name: "Ballistic Shield", type: "defense" },
      { name: "Gas Mask", type: "defense" },
      { name: "Tactical Helmet", type: "defense" },
      { name: "Steel Barrier", type: "defense" },
    ],
    attackPhrases: [
      "{attacker} fired at {defender} with a {item}.",
      "{attacker} ambushed {defender} using their {item}.",
      "{attacker} hurled a {item} at {defender}.",
      "{attacker} struck {defender} with their {item}.",
      "{attacker} unleashed a barrage from their {item}.",
    ],
    defensePhrases: [
      "{defender} absorbed the attack with their {item}.",
      "{defender} blocked the blow using a {item}.",
      "{defender} ducked behind their {item} to evade the strike.",
      "{defender}'s {item} deflected the impact.",
      "{defender} braced themselves behind a {item}.",
    ],
  },
  {
    name: "Futuristic",
    items: [
      // Attack Items
      { name: "Plasma Blaster", type: "attack" },
      { name: "Laser Sword", type: "attack" },
      { name: "EMP Grenade", type: "attack" },
      { name: "Particle Rifle", type: "attack" },
      { name: "AI Drone", type: "attack" },
      // Defense Items
      { name: "Holographic Shield", type: "defense" },
      { name: "Energy Barrier", type: "defense" },
      { name: "Force Field Generator", type: "defense" },
      { name: "Adaptive Armor", type: "defense" },
      { name: "Nano Cloak", type: "defense" },
    ],
    attackPhrases: [
      "{attacker} blasted {defender} with a {item}.",
      "{attacker} unleashed a beam from their {item} at {defender}.",
      "{attacker} targeted {defender} with a {item}.",
      "{attacker} struck {defender} using their {item}.",
      "{attacker} deployed a {item} against {defender}.",
    ],
    defensePhrases: [
      "{defender} activated their {item} to block the attack.",
      "{defender}'s {item} absorbed the blow.",
      "{defender} deflected the strike with their {item}.",
      "{defender} cloaked themselves with a {item}.",
      "{defender} projected a {item} to shield themselves.",
    ],
  },
  {
    name: "Medieval",
    items: [
      // Attack Items
      { name: "Steel Longsword", type: "attack" },
      { name: "Heavy Crossbow", type: "attack" },
      { name: "Warhammer", type: "attack" },
      { name: "Battle Axe", type: "attack" },
      { name: "Flaming Arrows", type: "attack" },
      // Defense Items
      { name: "Tower Shield", type: "defense" },
      { name: "Chainmail", type: "defense" },
      { name: "Wooden Barricade", type: "defense" },
      { name: "Iron Helmet", type: "defense" },
      { name: "Reinforced Armor", type: "defense" },
    ],
    attackPhrases: [
      "{attacker} swung their {item} at {defender}.",
      "{attacker} fired a bolt at {defender} with their {item}.",
      "{attacker} smashed {defender} with a blow from their {item}.",
      "{attacker} hurled {item} at {defender}.",
      "{attacker} charged {defender} wielding a {item}.",
    ],
    defensePhrases: [
      "{defender} raised their {item} to block the attack.",
      "{defender} absorbed the impact with their {item}.",
      "{defender} deflected the strike with a {item}.",
      "{defender}'s {item} protected them from harm.",
      "{defender} braced themselves with their {item}.",
    ],
  },
  {
    name: "Pirate",
    items: [
      // Attack Items
      { name: "Cannonball", type: "attack" },
      { name: "Cutlass", type: "attack" },
      { name: "Flintlock Pistol", type: "attack" },
      { name: "Ramming Pole", type: "attack" },
      { name: "Throwing Knives", type: "attack" },
      // Defense Items
      { name: "Wooden Plank", type: "defense" },
      { name: "Anchor", type: "defense" },
      { name: "Pirate Flag", type: "defense" },
      { name: "Treasure Chest", type: "defense" },
      { name: "Barrel Shield", type: "defense" },
    ],
    attackPhrases: [
      "{attacker} fired a {item} at {defender}.",
      "{attacker} slashed {defender} with a {item}.",
      "{attacker} hurled a {item} at {defender}.",
      "{attacker} rammed {defender}'s defenses with a {item}.",
      "{attacker} struck {defender} with their {item}.",
    ],
    defensePhrases: [
      "{defender} blocked the attack with their {item}.",
      "{defender} ducked behind a {item} to evade the strike.",
      "{defender} deflected the blow using their {item}.",
      "{defender}'s {item} absorbed the impact.",
      "{defender} shielded themselves with their {item}.",
    ],
  },
  {
    name: "Mythical",
    items: [
      // Attack Items
      { name: "Thunderbolt", type: "attack" },
      { name: "Flaming Sword", type: "attack" },
      { name: "Trident of Poseidon", type: "attack" },
      { name: "Medusa’s Gaze", type: "attack" },
      { name: "Phoenix Flame", type: "attack" },
      // Defense Items
      { name: "Golden Shield", type: "defense" },
      { name: "Aegis", type: "defense" },
      { name: "Dragon Scale Armor", type: "defense" },
      { name: "Celestial Barrier", type: "defense" },
      { name: "Helm of Hades", type: "defense" },
    ],
    attackPhrases: [
      "{attacker} hurled a {item} at {defender}, lighting up the battlefield.",
      "{attacker} slashed {defender} with their {item}, unleashing divine fury.",
      "{attacker} unleashed the wrath of a {item} on {defender}.",
      "{attacker} blinded {defender} using the power of a {item}.",
      "{attacker} scorched {defender} with their fiery {item}.",
    ],
    defensePhrases: [
      "{defender} deflected the attack with their {item}.",
      "{defender} summoned a {item} to shield themselves from harm.",
      "{defender} absorbed the blow with their mighty {item}.",
      "{defender} invoked their {item} to block the strike.",
      "{defender} stood firm, their {item} glowing with protective power.",
    ],
  },
  {
    name: "Cyberpunk",
    items: [
      // Attack Items
      { name: "Neon Katana", type: "attack" },
      { name: "Hacking Drone", type: "attack" },
      { name: "Plasma Rifle", type: "attack" },
      { name: "EMP Blade", type: "attack" },
      { name: "Explosive Cyber Grenade", type: "attack" },
      // Defense Items
      { name: "Cyber Shield", type: "defense" },
      { name: "Neural Overdrive", type: "defense" },
      { name: "Cloaking Module", type: "defense" },
      { name: "Nano Armor", type: "defense" },
      { name: "Energy Deflector", type: "defense" },
    ],
    attackPhrases: [
      "{attacker} slashed {defender} with their {item}, leaving a neon trail.",
      "{attacker} deployed a {item} to hack into {defender}'s defenses.",
      "{attacker} fired a burst from their {item}, targeting {defender}.",
      "{attacker} struck {defender} with an electrifying {item}.",
      "{attacker} launched a {item}, creating a neon explosion around {defender}.",
    ],
    defensePhrases: [
      "{defender} activated their {item} to block the assault.",
      "{defender}'s {item} absorbed the plasma blast.",
      "{defender} vanished into thin air using their {item}.",
      "{defender} deflected the strike with their {item}.",
      "{defender} stood firm behind their glowing {item}.",
    ],
  },
  {
    name: "Viking",
    items: [
      // Attack Items
      { name: "Battle Axe", type: "attack" },
      { name: "Seax Dagger", type: "attack" },
      { name: "Throwing Spear", type: "attack" },
      { name: "Longbow", type: "attack" },
      { name: "Molten Hammer", type: "attack" },
      // Defense Items
      { name: "Round Shield", type: "defense" },
      { name: "Bearskin Cloak", type: "defense" },
      { name: "Iron Helm", type: "defense" },
      { name: "Wooden Fortification", type: "defense" },
      { name: "Runic Armor", type: "defense" },
    ],
    attackPhrases: [
      "{attacker} swung their {item} with brute force at {defender}.",
      "{attacker} hurled a {item} at {defender}, roaring a battle cry.",
      "{attacker} drew back their {item} and let it fly at {defender}.",
      "{attacker} charged forward with their {item}, striking {defender}.",
      "{attacker} smashed {defender} with a fiery blow from their {item}.",
    ],
    defensePhrases: [
      "{defender} raised their {item}, deflecting the incoming strike.",
      "{defender} blocked the attack with their sturdy {item}.",
      "{defender} braced themselves, their {item} absorbing the blow.",
      "{defender} crouched behind their {item}, avoiding the attack.",
      "{defender}'s {item} glowed with runes, protecting them from harm.",
    ],
  },
  {
    name: "Zombieland",
    items: [
      // Attack Items
      { name: "Rusty Machete", type: "attack" },
      { name: "Makeshift Crossbow", type: "attack" },
      { name: "Explosive Barrel", type: "attack" },
      { name: "Sawblade Launcher", type: "attack" },
      { name: "Molotov", type: "attack" },
      // Defense Items
      { name: "Scrap Metal Shield", type: "defense" },
      { name: "Gas Mask", type: "defense" },
      { name: "Tire Armor", type: "defense" },
      { name: "Wooden Barricade", type: "defense" },
      { name: "Rusty Helmet", type: "defense" },
    ],
    attackPhrases: [
      "{attacker} swung their {item} at {defender} with reckless force.",
      "{attacker} fired a shot from their {item}, aiming at {defender}.",
      "{attacker} hurled a {item} at {defender}, causing an explosion.",
      "{attacker} launched a spinning blade from their {item} at {defender}.",
      "{attacker} scorched {defender} with a fiery {item}.",
    ],
    defensePhrases: [
      "{defender} blocked the attack with their {item}.",
      "{defender} crouched behind their {item}, avoiding damage.",
      "{defender}'s {item} absorbed most of the impact.",
      "{defender} used their {item} to shield themselves from harm.",
      "{defender}'s {item} deflected the blow just in time.",
    ],
  },
  {
    name: "Spacewar",
    items: [
      // Attack Items
      { name: "Plasma Gun", type: "attack" },
      { name: "Asteroid Hammer", type: "attack" },
      { name: "Alien Blaster", type: "attack" },
      { name: "Zero-G Spear", type: "attack" },
      { name: "Laser Cutter", type: "attack" },
      // Defense Items
      { name: "Anti-Gravity Shield", type: "defense" },
      { name: "Space Suit Reinforcement", type: "defense" },
      { name: "Energy Deflector", type: "defense" },
      { name: "Hardened Glass Helmet", type: "defense" },
      { name: "Nano-Reinforced Armor", type: "defense" },
    ],
    attackPhrases: [
      "{attacker} fired a plasma blast from their {item} at {defender}.",
      "{attacker} smashed {defender} with their heavy {item}.",
      "{attacker} aimed their {item} at {defender}, releasing a deadly beam.",
      "{attacker} lunged at {defender} with their {item}, striking in zero gravity.",
      "{attacker} sliced through the void with their {item}, targeting {defender}.",
    ],
    defensePhrases: [
      "{defender}'s {item} absorbed the plasma blast.",
      "{defender} deflected the attack with their {item}.",
      "{defender}'s {item} shimmered, blocking the strike.",
      "{defender} evaded the attack behind their {item}.",
      "{defender}'s {item} absorbed the shock, leaving them unharmed.",
    ],
  },
  {
    name: "Web3",
    items: [
      // Attack Items
      { name: "Drained Wallet", type: "attack" },
      { name: "Rugged Memecoin", type: "attack" },
      { name: "Hacked Ledger", type: "attack" },
      { name: "Overpriced NFT", type: "attack" },
      { name: "Phishing Scam", type: "attack" },
      // Defense Items
      { name: "Used WalletGuard", type: "defense" },
      { name: "Cold Storage Wallet", type: "defense" },
      { name: "Hardware Wallet", type: "defense" },
      { name: "Anonymous Burner Wallet", type: "defense" },
      { name: "Decentralized Identity (DID)", type: "defense" },
    ],
    attackPhrases: [
      "{attacker} drained {defender}'s wallet with a {item}.",
      "{attacker} rugged {defender} using a {item}.",
      "{attacker} hacked {defender} with their {item}.",
      "{attacker} floored {defender} with an {item} dump.",
      "{attacker} dropped a phishing link and snagged {defender}'s funds using a {item}.",
    ],
    defensePhrases: [
      "{defender} secured their funds with a {item}.",
      "{defender}'s {item} blocked the hack attempt.",
      "{defender} shrugged off the attack using {item}.",
      "{defender} held strong behind a {item}.",
      "{defender}'s {item} shielded their wallet from harm.",
    ],
  },
];
