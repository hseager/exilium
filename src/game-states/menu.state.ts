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
      24,
      xCenter,
      200
    );
    drawEngine.drawText(
      "pylons cast a menacing shadow, controlling every aspect of life.",
      24,
      xCenter,
      236
    );
    drawEngine.drawText(
      "The people live in terror, their freedom crushed by the AI's",
      24,
      xCenter,
      270
    );
    drawEngine.drawText(
      "relentless grip. But the Vanguard, a brave band of rebels,",
      24,
      xCenter,
      304
    );
    drawEngine.drawText(
      "rises to challenge this tyranny. Their mission: destroy the pylons,",
      24,
      xCenter,
      336
    );
    drawEngine.drawText(
      "dismantle the AI, and restore liberty to a world on the edge of despair.",
      23,
      xCenter,
      366
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
