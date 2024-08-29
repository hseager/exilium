import { State } from "@/core/types";
import { drawEngine } from "@/core/draw-engine";
import { controls } from "@/core/controls";
import { select } from "@/util";

class WinState implements State {
  onEnter() {
    select<HTMLDivElement>(".damage-meter")?.classList.add("d-none");
    select<HTMLDivElement>(".controls")?.classList.add("d-none");
    c2d.addEventListener("click", () => {
      window.location.reload();
    });
  }

  onUpdate() {
    const xCenter = drawEngine.context.canvas.width / 2;
    drawEngine.drawText("You defeated", 60, xCenter, 60);
    drawEngine.drawText("the Dominus Network", 60, xCenter, 120);
    drawEngine.drawText(
      "Victory is yours! The Dominus Network crumbles, and the dawn ",
      24,
      xCenter,
      240
    );
    drawEngine.drawText(
      "of a new era begins — The Vanguard has reclaimed freedom for all!",
      24,
      xCenter,
      284
    );
    drawEngine.drawText("Back to Menu", 60, xCenter, 400);
    this.updateControls();
  }

  updateControls() {
    if (controls.isConfirm) {
      window.location.reload();
    }
  }
}

export const winState = new WinState();
