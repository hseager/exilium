import { Faction, Mode, Pylon, State } from "@/core/types";
import { drawEngine } from "@/core/draw-engine";
import { controls } from "@/core/controls";
import { gameStateMachine } from "@/game-state-machine";
import { menuState } from "@/game-states/menu.state";
import { GameManager } from "@/core/game-manager";
import {
  getFactionTheme,
  infantryStyle,
  pylonDamageRange,
  pylonWidth,
  pylonY,
  safeZoneConfig,
  wallConfig,
} from "@/core/config";

class GameState implements State {
  private pylonSprite = new Image();
  private ctx;
  private gameManager;

  constructor() {
    this.ctx = drawEngine.context;
    this.pylonSprite.src = "pylon.png";
    this.gameManager = new GameManager();
  }

  onEnter() {}

  onUpdate(delta: number) {
    this.setupBackground();
    this.drawPylons();
    this.drawSafeZone();
    this.drawUnits();

    this.handleUnitPlacement();

    this.gameManager.updateTimers(delta);

    if (controls.isEscape) {
      gameStateMachine.setState(menuState);
    }
  }

  private handleUnitPlacement() {
    if (this.gameManager.mode == Mode.PlaceUnit) {
      const xPadding = 40;
      let x = drawEngine.mousePosition.x;
      const y = drawEngine.canvasHeight - 25;

      if (x < xPadding) x = xPadding;
      if (x > drawEngine.canvasWidth - xPadding)
        x = drawEngine.canvasWidth - xPadding;

      const theme = getFactionTheme(Faction.Vanguard);

      this.ctx.beginPath();
      this.ctx.arc(x, y, infantryStyle.radius, 0, 2 * Math.PI);
      this.ctx.fillStyle = theme.fill;
      this.ctx.strokeStyle = theme.border;

      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }

  private setupBackground() {
    const gradient = this.ctx.createLinearGradient(
      0,
      0,
      0,
      drawEngine.canvasHeight
    );

    // Add color stops
    gradient.addColorStop(0, "#1f313f"); // Dark color at the top
    gradient.addColorStop(0.05, "#385a64");
    gradient.addColorStop(0.1, "#618384");
    gradient.addColorStop(0.2, "#cfd3c2");
    gradient.addColorStop(0.24, "#6b8a8d");
    gradient.addColorStop(1, "#010008"); // Lighter color at the bottom

    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, drawEngine.canvasWidth, drawEngine.canvasHeight);
  }

  private drawPylons() {
    const spacing = drawEngine.canvasWidth / this.gameManager.pylons.length + 1;

    // Draw 13 pylons across the screen
    this.gameManager.pylons.forEach((pylon, i) => {
      const x = spacing * (i + 1) - pylonWidth / 2;

      // Check for units damaging them
      this.gameManager.units.forEach((unit) => {
        const distance = Math.sqrt(
          (unit.position.x - x) ** 2 + (unit.position.y - pylonY) ** 2
        );

        if (distance <= pylonDamageRange && !unit.hasAttackedPylon) {
          // Apply damage to the pylon
          pylon.life -= unit.stats.attack;
          unit.hasAttackedPylon = true;

          // Optionally, handle the case where the pylon is destroyed
          if (pylon.life <= 0) {
            console.log(`Pylon ${i} is destroyed!`);
            // You might want to remove the pylon from the array or mark it as destroyed
          }
        }
      });

      this.drawPylon(x, pylonY, pylon);
    });

    this.drawWall();
  }

  private drawWall() {
    this.ctx.beginPath();
    this.ctx.moveTo(wallConfig.x, wallConfig.y);
    this.ctx.lineTo(drawEngine.canvasWidth - wallConfig.x, wallConfig.y);
    this.ctx.lineWidth = wallConfig.width;

    this.ctx.strokeStyle = wallConfig.color;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  private drawSafeZone() {
    const safeZoneHeight = drawEngine.canvasHeight - safeZoneConfig.y;
    this.ctx.beginPath();
    this.ctx.moveTo(safeZoneConfig.x, safeZoneHeight);
    this.ctx.lineTo(drawEngine.canvasWidth - safeZoneConfig.x, safeZoneHeight);
    this.ctx.lineWidth = wallConfig.width;

    this.ctx.strokeStyle = safeZoneConfig.color;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  private drawPylon(x: number, y: number, pylon: Pylon) {
    const originalHeight = 100; // Assuming the original height of the pylon sprite is 100px
    const clippedHeight = (pylon.life / pylon.maxLife) * originalHeight;

    this.ctx.save(); // Save the current state of the canvas

    // Define the clipping region
    this.ctx.beginPath();
    this.ctx.rect(x, y + (originalHeight - clippedHeight), 40, clippedHeight);
    this.ctx.clip();

    // Draw the pylon image within the clipped region
    this.ctx.drawImage(this.pylonSprite, x, y, 40, originalHeight);

    this.ctx.restore(); // Restore the canvas to its original state
  }

  private drawUnits() {
    this.gameManager.units = this.gameManager.units?.filter((unit) => {
      if (unit.position.y <= wallConfig.y) {
        return false; // Exclude this unit from the new array
      }

      unit.position.y = unit.position.y - unit.stats.moveSpeed;

      const theme = getFactionTheme(unit.faction);

      this.ctx.beginPath();
      this.ctx.arc(
        unit.position.x,
        unit.position.y,
        infantryStyle.radius,
        0,
        2 * Math.PI
      );
      this.ctx.fillStyle = theme.fill;
      this.ctx.strokeStyle = theme.border;
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.closePath();

      return true; // Keep this unit in the new array
    });
  }
}

export const gameState = new GameState();
