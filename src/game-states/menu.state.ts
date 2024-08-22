import { State } from "@/core/types";
import { drawEngine } from "@/core/draw-engine";
import { controls } from "@/core/controls";
import { gameStateMachine } from "@/game-state-machine";
import { gameState } from "./game.state";

class MenuState implements State {
  private startGame() {
    gameStateMachine.setState(gameState);
  }

  onEnter() {
    c2d.addEventListener("click", this.startGame);
  }

  onUpdate() {
    const xCenter = drawEngine.context.canvas.width / 2;
    drawEngine.drawText("Exilium:", 60, xCenter, 60);
    drawEngine.drawText("The fall of Dominus", 45, xCenter, 120);
    drawEngine.drawText(
      "In a world ruled by fear, the Dominus Network’s 13 towering",
      20,
      xCenter,
      200
    );
    drawEngine.drawText(
      "pylons cast a menacing shadow, controlling every aspect of life.",
      20,
      xCenter,
      232
    );
    drawEngine.drawText(
      "The people live in terror, their freedom crushed by the AI's relentless grip.",
      20,
      xCenter,
      264
    );
    drawEngine.drawText(
      "But the Vanguard, a brave band of rebels, rises to challenge this tyranny.",
      20,
      xCenter,
      294
    );
    drawEngine.drawText(
      "Their mission: destroy the pylons, dismantle the AI, and restore",
      20,
      xCenter,
      324
    );
    drawEngine.drawText(
      "liberty to a world on the edge of despair.",
      20,
      xCenter,
      354
    );
    drawEngine.drawText("Start Game", 60, xCenter, 500);
    this.updateControls();
  }

  updateControls() {
    if (controls.isConfirm) {
      gameStateMachine.setState(gameState);
    }
  }

  onLeave() {
    c2d.removeEventListener("click", this.startGame);
  }
}

export const menuState = new MenuState();
