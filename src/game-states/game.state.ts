import { State } from "@/core/types";
import { drawEngine } from "@/core/draw-engine";
import { controls } from "@/core/controls";
import { gameStateMachine } from "@/game-state-machine";
import { menuState } from "@/game-states/menu.state";

class GameState implements State {
  private pylon = new Image();
  private unitPosition: DOMPoint;
  private ctx;
  private gameManager;

  constructor() {
    this.ctx = drawEngine.context;
    this.pylon.src = "pylon.png";
    this.unitPosition = new DOMPoint(100, drawEngine.canvasHeight);
    // this.gameManager = new Game
  }

  onEnter() {}

  onUpdate() {
    this.setupBackground();
    this.drawPylons();
    this.drawUnits();

    if (controls.isEscape) {
      gameStateMachine.setState(menuState);
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
      this.drawPylon(x, drawEngine.canvasHeight * 0.1);
    }
  }

  private drawPylon(x: number, y: number) {
    this.ctx.drawImage(this.pylon, x, y, 40, 100);
  }

  private drawUnits() {
    const spawnPaddingY = 20;
    const radius = 12;
    const y = drawEngine.canvasHeight - radius - spawnPaddingY;

    this.unitPosition.y = this.unitPosition.y - 0.3;

    // Draw the circle
    this.ctx.beginPath();
    this.ctx.arc(
      this.unitPosition.x,
      this.unitPosition.y,
      radius,
      0,
      2 * Math.PI
    ); // Draw circle
    this.ctx.fillStyle = "#ccc"; // Set the fill color
    this.ctx.strokeStyle = "#333";

    this.ctx.fill(); // Fill the circle
    this.ctx.stroke();
    this.ctx.closePath();
  }
}

export const gameState = new GameState();
