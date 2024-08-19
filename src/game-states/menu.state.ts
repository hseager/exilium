import { State } from "@/core/types";
import { drawEngine } from "@/core/draw-engine";
import { controls } from "@/core/controls";
import { gameStateMachine } from "@/game-state-machine";
import { gameState } from "./game.state";

class MenuState implements State {
  onUpdate() {
    const xCenter = drawEngine.context.canvas.width / 2;
    drawEngine.drawText("Exilium", 80, xCenter, 90);
    drawEngine.drawText("The fall of Dominus", 50, xCenter, 160);
    drawEngine.drawText("Start Game", 60, xCenter, 400);
    this.updateControls();
  }

  updateControls() {
    if (controls.isConfirm) {
      gameStateMachine.setState(gameState);
    }
  }
}

export const menuState = new MenuState();
