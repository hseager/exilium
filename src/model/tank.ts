import { getFactionTheme, tankStyle } from "@/core/config";
import { Unit } from "./unit";
import { Faction, Stats } from "@/core/types";

export class Tank extends Unit {
  constructor(faction: Faction, stats: Stats) {
    super(faction, stats);
  }

  draw(ctx: CanvasRenderingContext2D, x?: number, y?: number) {
    const theme = getFactionTheme(this.faction);

    const healthRatio = this.stats.health / this.maxHealth;
    const fillHeight = tankStyle.height * healthRatio;

    ctx.beginPath();

    ctx.rect(
      x ? x - tankStyle.width / 2 : this.position.x - tankStyle.width / 2,
      y ? y - tankStyle.height / 2 : this.position.y - tankStyle.height / 2,
      tankStyle.width,
      tankStyle.height
    );

    ctx.strokeStyle = theme.border;
    ctx.stroke();

    ctx.beginPath();
    ctx.rect(
      x ? x - tankStyle.width / 2 : this.position.x - tankStyle.width / 2,
      y
        ? y - tankStyle.height / 2 + (tankStyle.height - fillHeight)
        : this.position.y -
            tankStyle.height / 2 +
            (tankStyle.height - fillHeight),
      tankStyle.width,
      fillHeight
    );
    ctx.fillStyle = theme.fill;
    ctx.fill();
  }
}
