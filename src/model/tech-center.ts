import { Stats } from "@/core/types";
import { selectAll } from "@/util";

export class TechCentre {
  points = 5;
  infantryStatPoints: Stats;

  constructor() {
    this.infantryStatPoints = {
      attack: 2,
      attackSpeed: 2,
      moveSpeed: 2,
      health: 2,
      range: 2,
    };

    this.setRangeSliders();
  }

  private setRangeSliders() {
    const rangeSliders = selectAll<HTMLInputElement>(".tech-range");

    rangeSliders &&
      rangeSliders.forEach((slider) => {
        slider.onchange = (event: Event) => {
          console.log(event.target);
        };
      });
  }
}
