import { State } from "@/core/types";
import { drawEngine } from "@/core/draw-engine";
import { controls } from "@/core/controls";
import { select } from "@/util";

export class LoseState implements State {
  private level: number;

  constructor(level: number) {
    this.level = level;
  }

  onEnter() {
    select<HTMLDivElement>(".damage-meter")?.classList.add("d-none");
    select<HTMLDivElement>(".controls")?.classList.add("d-none");
    c2d.addEventListener("click", () => {
      window.location.reload();
    });
  }

  onUpdate() {
    const xCenter = drawEngine.context.canvas.width / 2;
    drawEngine.drawText("You were defeated", 80, xCenter, 90);
    drawEngine.drawText(
      "Hope fades as the Dominus Network tightens its grip.",
      24,
      xCenter,
      160
    );
    drawEngine.drawText(
      "The Vanguard's resistance has been crushed, but the ",
      24,
      xCenter,
      190
    );
    drawEngine.drawText(
      "fight for freedom is far from over.",
      24,
      xCenter,
      220
    );
    drawEngine.drawText(
      `You made it to level ${this.level}.`,
      30,
      xCenter,
      290
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
