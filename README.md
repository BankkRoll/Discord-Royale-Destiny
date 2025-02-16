# 🚀 Destiny: Era-Based Battle Bot  

Destiny brings fast-paced, automated battle royale gameplay to your Discord server. With multiple eras, unique items, and thrilling randomized outcomes, Destiny transforms your server into an epic battleground for glory and fun.  

---

## ✨ Features  

- **Era-Based Battles**: Choose from eras like Modern, Medieval, Futuristic, and more, each with unique items and styles.  
- **Interactive Progress Bars**: Join games with an engaging, updating progress bar and live join/leave buttons.  
- **Automated Combat System**: Fully randomized battles where items, players, and outcomes are generated dynamically.  
- **Customizable Roles and Rewards**: Admins can assign special roles to winners or tailor the game to their server.  
- **Dynamic Gameplay**: Engages users with strategic decision-making, stats tracking, and leaderboards.  

---

## 🌟 Why Choose Destiny?  

- **Interactive Fun**: Keeps your community engaged with dynamic gameplay.  
- **Developer Friendly**: Easily customizable for your server's needs.  
- **Effortless Management**: Admins have full control over game settings, roles, and timers.  
- **Unique Themes**: Diverse eras and items create endless possibilities for battles.  

---

## 🚀 Getting Started

### 1. **Download or Fork the Repository**

#### **Option 1: Download as a ZIP**
```
1. Click the **Code** button on the repository page.
2. Select **Download ZIP**.
3. Extract the ZIP file to your desired location.
```

#### **Option 2: Clone the Repository (Recommended)**
```sh
git clone https://github.com/BankkRoll/Discord-Royale-Destiny.git
```

#### **Option 3: Fork the Repository**
```
1. Click the **Fork** button on the repository page.
2. Navigate to your forked repository.
3. Clone your fork using:
```

```sh
git clone https://github.com/BankkRoll/Discord-Royale-Destiny.git
```

---

### 2. **Install Dependencies**

Run the following command to install required packages:

```
npm install
```

---

### 3. **Set Up Environment Variables**

Create a `.env` file in the root directory and add the following:

```
# Discord Bot Configuration
DISCORD_BOT_TOKEN="<your-bot-token>"
DISCORD_CLIENT_ID="<your-client-id>"
DISCORD_CLIENT_SECRET="<your-client-secret>"
```

---

### 4. **Build the Bot**

Run the following command to build the bot:

```
npm run build
```

### 5. **Run the Bot**

Run the following command to start the bot:

```
npm run start
```

---
## ⚙️ Core Features  

# Destiny Bot Command List

### 🛡️ Admin Commands
Admins configure and control Destiny battles to fit their server's needs.

#### `/set-game`
- **Purpose**: Define who can trigger the `/start` command.
- **Options**:
  - `Everyone`: Anyone in the server can start a battle.
  - `Admins Only`: Only server admins can start a battle.
  - `Role-Based`: A specific role is allowed to start battles.
- **Behavior**:
  - Updates the server settings with the specified access control.
  - Role-based option should validate the selected role and ensure it's saved for future checks.
- **Example**: `/set-game everyone` or `/set-game @PlayerRole`

---

#### `/set-winning-role`
- **Purpose**: Assign a role to players who win battles.
- **Behavior**:
  - Saves the specified role to server settings.
  - When a battle ends, the bot automatically assigns this role to the winner(s).
- **Example**: `/set-winning-role @Champion`

---

#### `/remove-winning-role`
- **Purpose**: Remove the role assigned to winners of battles.
- **Behavior**:
  - Clears the saved role from server settings.
  - Prevents any future role assignment to battle winners until a new role is set.
- **Example**: `/remove-winning-role`

---

#### `/set-timer {duration}`
- **Purpose**: Set the preparation time before a battle begins.
- **Options**:
  - `duration`: The countdown time in seconds (between 10 and 600 seconds).
- **Behavior**:
  - Updates the server settings with the specified duration.
  - Ensures the value is within the acceptable range (10–600 seconds).
- **Example**: `/set-timer 120s`

---

#### `/set-era {era}`
- **Purpose**: Set the default era for battles.
- **Options**:
  - `era`: The name of the era (e.g., `modern`, `futuristic`, `medieval`).
- **Behavior**:
  - Updates the server settings to save the default era.
  - If no era is specified during `/start`, this default era is used.
- **Example**: `/set-era futuristic`

---

### 🧑‍🤝‍🧑 User Commands
Players interact with the bot to join games, track stats, and compete.

#### `/start {era}`
- **Purpose**: Start a new battle in a specified era.
- **Behavior**:
  - Displays an interactive embed with:
    - Join/Leave buttons.
    - A progress bar that updates every 10% of the countdown timer.
    - Details about the era and player count.
  - Allows users to join or leave the battle during the preparation phase.
  - After the timer ends, starts the battle simulation with participants.
- **Access**:
  - Admin-only by default but configurable using `/set-game`.
- **Example**: `/start modern`

---

#### `/profile`
- **Purpose**: View your personal stats, inventory, and rank.
- **Behavior**:
  - Retrieves user data, including:
    - Total wins.
    - Total losses.
    - Total games played.
  - Displays the data in an embed for easy readability.
- **Example**: `/profile`

---

#### `/leaderboard`
- **Purpose**: See the top players in the server.
- **Behavior**:
  - Retrieves and displays a leaderboard of the top 10 players based on total wins.
  - Includes:
    - Player mention.
    - Total wins and losses.
  - Organized in descending order by wins.
- **Example**: `/leaderboard`

---

## 🎮 How It Works  

### **Admin Flow**:  
1. Use `/set-game` to define who can start games.  
2. Configure gameplay with `/set-era` and `/set-timer`.  
3. Assign special roles for winners using `/set-winning-role`.  
4. Start a battle with `/start {era}`.  

### **Game Flow**:  
1. **Game Start**:  
   - The bot sends an embed with a progress bar (updated every 10%), join/leave buttons, and battle details.  

2. **Player Actions**:  
   - Players join by clicking the **Join** button.  
   - They can leave before the game starts using the **Leave** button.  

3. **Battle Simulation**:  
   - Once the timer ends, the bot pairs players randomly for combat.  
   - Players attack and defend using era-specific items.  
   - The simulation continues until one player is declared the **winner**.  

4. **Winner Announcement**:  
   - The bot announces the winner in the channel and assigns the winning role (if configured).  

---

## 🌟 Example Scenario  

### **Admin Setup**:  
1. `/set-era medieval`  
2. `/set-timer 120s`  
3. `/set-winning-role @Champion`  

### **Game Start**:  
Admin uses `/start medieval`.  

### **Embed Example**:  
```
🚀 **Destiny Battle Starting Soon!**  
Era: Medieval  
Progress: [■■■□□□□□□] 30%  
Players: 5  
[Join Game] [Leave Game]  
```

### **Battle Example**:  
- Player 1 attacks Player 2 with a **Golden Mace** (Outcome: 50 damage).  
- Player 3 defends against Player 4’s **Frozen Shield** (Outcome: no damage).  
- Combat continues until there’s one winner.  

### **Winner Announcement**:  
```
🎉 **Victory!**  
@Username is the winner of the Medieval Era Battle!  
Reward: @Champion Role  
```

---

## ⚙️ Customization Options  

- **Game Access**: Decide who can start games via `/set-game`.  
- **Winning Roles**: Assign and manage exclusive roles for winners.  
- **Eras**: Set the default era for your server or let admins choose per game.  
- **Timer Duration**: Adjust preparation time to fit your server’s activity level.  

---

## ✨ Why Destiny Stands Out  

- **Community Engagement**: Keeps your server active with exciting gameplay.  
- **Customizable Fun**: Adapt the game to fit your server’s unique theme.  
- **Effortless Setup**: Minimal admin effort to create maximum fun.  
- **Diverse Eras**: Fresh content with unique items and gameplay styles for every game.  
