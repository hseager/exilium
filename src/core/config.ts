import { Faction, Stats, TimerConfig } from "./types";

export const wallConfig = {
  x: 20,
  y: 141,
  color: "#111",
  width: 3,
};
export const safeZoneConfig = {
  x: 20,
  y: 50,
  color: "#ccc",
  width: 3,
};

export const pylonCount = 13;
export const pylonWidth = 44;
export const pylonY = 40;
export const pylonDamageRange = 107;

export const pylonHexCodes = [
  "#3F3C7D", // Deep Purple
  "#4C4F9B", // Medium Purple-Blue
  "#7A79C0", // Light Purple-Blue
  "#8F8EC4", // Soft Purple-Blue
  "#A4A1C8", // Very Light Purple-Blue
  "#B9B6D1", // Lightest Purple-Blue
  "#D0C9E3", // Almost White Purple-Blue
  "#C8B9E2", // Very Light Lavender
  "#B0A1E1", // Light Lavender-Blue
  "#9B8CD0", // Medium Lavender-Blue
  "#7A79C0", // Light Purple-Blue
  "#4C4F9B", // Medium Purple-Blue
  "#3F3C7D", // Deep Purple
];

export const playerMaxLife = 100;

export const playerInfantryStats: Stats = {
  attack: 10,
  attackSpeed: 20,
  moveSpeed: 1,
  defence: 3,
  health: 100,
  range: 4,
};

export const enemyInfantryStats: Stats = {
  attack: 8,
  attackSpeed: 20,
  moveSpeed: 0.8,
  defence: 3,
  health: 100,
  range: 4,
};

export function getFactionTheme(faction: Faction) {
  if (faction === Faction.Vanguard) {
    return {
      fill: "#18beba",
      border: "#08121c",
    };
  } else {
    return {
      fill: "#1c387f",
      border: "#061939",
    };
  }
}

export const infantryStyle = {
  radius: 12,
};

export const playerInfantryTimer: TimerConfig = {
  maxTime: 100,
  speed: 0.01,
};
export const playerResearchTimer: TimerConfig = {
  maxTime: 100,
  speed: 0.002,
};
export const enemyInfantryTimer: TimerConfig = {
  maxTime: 100,
  // speed: 0.007,
  speed: 0.02,
};
