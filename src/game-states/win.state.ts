import { State } from "@/core/types";
import { drawEngine } from "@/core/draw-engine";
import { controls } from "@/core/controls";
import { gameStateMachine } from "@/game-state-machine";
import { menuState } from "./menu.state";

class WinState implements State {
  onUpdate() {
    const xCenter = drawEngine.context.canvas.width / 2;
    drawEngine.drawText("You defeated", 80, xCenter, 90);
    drawEngine.drawText("the Dominus Network", 80, xCenter, 160);
    drawEngine.drawText("Liberty prevails! for now...", 50, xCenter, 240);
    drawEngine.drawText("Back to Menu", 60, xCenter, 400);
    this.updateControls();
  }

  updateControls() {
    if (controls.isConfirm) {
      gameStateMachine.setState(menuState);
    }
  }
}

export const winState = new WinState();
