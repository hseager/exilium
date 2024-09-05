import { aircraftStyle, getFactionTheme } from "@/core/config";
import { Unit } from "./unit";
import { Faction, Stats } from "@/core/types";

export class Aircraft extends Unit {
  constructor(faction: Faction, stats: Stats) {
    super(faction, stats);
  }

  draw(ctx: CanvasRenderingContext2D, x?: number, y?: number) {
    const theme = getFactionTheme(this.faction);

    const posX = x ?? this.position.x;
    const posY = y ?? this.position.y;

    const healthRatio = this.stats.health / this.maxHealth;
    const fillHeight = aircraftStyle.height * healthRatio;

    ctx.beginPath();

    const xPos = x ?? this.position.x;
    const yPos = y ?? this.position.y;

    const flipFactor = this.faction === Faction.Dominus ? -1 : 1;

    ctx.moveTo(xPos, yPos - (flipFactor * aircraftStyle.height) / 2);
    ctx.lineTo(
      xPos + aircraftStyle.width / 2,
      yPos + (flipFactor * aircraftStyle.height) / 2
    );
    ctx.lineTo(
      xPos - aircraftStyle.width / 2,
      yPos + (flipFactor * aircraftStyle.height) / 2
    );
    ctx.closePath();

    ctx.strokeStyle = theme.border;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(
      xPos,
      yPos -
        (flipFactor * aircraftStyle.height) / 2 +
        (aircraftStyle.height - fillHeight) * flipFactor
    );

    ctx.lineTo(
      xPos + aircraftStyle.width / 2,
      yPos + (flipFactor * aircraftStyle.height) / 2
    );

    ctx.lineTo(
      xPos - aircraftStyle.width / 2,
      yPos + (flipFactor * aircraftStyle.height) / 2
    );

    ctx.closePath();

    ctx.fillStyle = theme.fill;
    ctx.fill();
    ctx.closePath();
  }
}
