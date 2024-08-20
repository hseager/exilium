import { Faction } from "./types";

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
export const pylonWidth = 22;
export const pylonY = 40;
export const pylonDamageRange = 110;

export const playerInfantryStats = {
  attack: 20,
  attackSpeed: 20,
  moveSpeed: 2,
  defence: 3,
  health: 100,
  range: 4,
};

export function getFactionTheme(faction: Faction) {
  if (faction === Faction.Vanguard) {
    return {
      fill: "#917821",
      border: "#3d3002",
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

export const timerConfig = {
  infantry: {
    max: 100,
    speed: 0.01,
  },
};
