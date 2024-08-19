import { Mode, State } from "@/core/types";
import { drawEngine } from "@/core/draw-engine";
import { controls } from "@/core/controls";
import { gameStateMachine } from "@/game-state-machine";
import { menuState } from "@/game-states/menu.state";
import { GameManager } from "@/core/game-manager";

class GameState implements State {
  private pylon = new Image();
  private ctx;
  private gameManager;

  wallConfig = {
    x: 20,
    y: 141,
    color: "#111",
    width: 3,
  };
  safeZoneConfig = {
    x: 20,
    y: 50,
    color: "#ccc",
    width: 3,
  };

  constructor() {
    this.ctx = drawEngine.context;
    this.pylon.src = "pylon.png";
    this.gameManager = new GameManager();
  }

  onEnter() {}

  onUpdate() {
    this.setupBackground();
    this.drawPylons();
    this.drawUnits();
    this.drawSafeZone();

    this.handleUnitPlacement();

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

      this.ctx.beginPath();
      this.ctx.arc(x, y, 10, 0, 2 * Math.PI);
      this.ctx.fillStyle = "#ccc";
      this.ctx.strokeStyle = "#333";

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
    const pylonWidth = 22;
    const spacing = drawEngine.canvasWidth / 14; // 13 pylons, 14 spaces

    // Draw 13 pylons across the screen
    for (let i = 0; i < 13; i++) {
      const x = spacing * (i + 1) - pylonWidth / 2;
      this.drawPylon(x, 40);
    }

    this.drawWall();
  }

  private drawWall() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.wallConfig.x, this.wallConfig.y);
    this.ctx.lineTo(
      drawEngine.canvasWidth - this.wallConfig.x,
      this.wallConfig.y
    );
    this.ctx.lineWidth = this.wallConfig.width;

    this.ctx.strokeStyle = this.wallConfig.color;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  private drawSafeZone() {
    const safeZoneHeight = drawEngine.canvasHeight - this.safeZoneConfig.y;
    this.ctx.beginPath();
    this.ctx.moveTo(this.safeZoneConfig.x, safeZoneHeight);
    this.ctx.lineTo(
      drawEngine.canvasWidth - this.safeZoneConfig.x,
      safeZoneHeight
    );
    this.ctx.lineWidth = this.wallConfig.width;

    this.ctx.strokeStyle = this.safeZoneConfig.color;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  private drawPylon(x: number, y: number) {
    this.ctx.drawImage(this.pylon, x, y, 40, 100);
  }

  private drawUnits() {
    this.gameManager.units?.forEach((unit) => {
      const radius = 12;
      unit.position.y = unit.position.y - unit.stats.moveSpeed;

      this.ctx.beginPath();
      this.ctx.arc(unit.position.x, unit.position.y, radius, 0, 2 * Math.PI);
      this.ctx.fillStyle = "#ccc";
      this.ctx.strokeStyle = "#333";

      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.closePath();
    });
  }
}

export const gameState = new GameState();
