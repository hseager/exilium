import { Stats, UnitType } from "@/core/types";
import { select, selectAll } from "@/util";

export class TechCentre {
  // points = 5;
  points = 100;
  infantryStatPoints: Stats;
  tankStatPoints: Stats;

  constructor() {
    this.infantryStatPoints = {
      attack: 2,
      attackSpeed: 2,
      moveSpeed: 2,
      health: 2,
      range: 2,
    };

    this.tankStatPoints = {
      attack: 2,
      attackSpeed: 2,
      moveSpeed: 2,
      health: 2,
      range: 2,
    };

    this.updatePointsUI();
    this.setRangeSliders();
    this.initTabs();

    select("#tech-centre")?.classList.remove("d-none");
  }

  addSkillPoints(amount: number) {
    this.points += amount;
    this.updatePointsUI();
  }

  private initTabs() {
    const tabs = selectAll<HTMLDivElement>(".tab");

    tabs?.forEach((tab) => {
      tab.onclick = (event: Event) => {
        const element = event.target as HTMLDivElement;
        const { type } = element.dataset;

        tabs?.forEach((panel) => panel.classList.remove("active"));
        element.classList.add("active");

        const targetTab = select<HTMLDivElement>(`#${type}-tech`);
        const panels = selectAll<HTMLDivElement>(`.tab-panel`);
        panels?.forEach((panel) => panel.classList.remove("active"));
        targetTab?.classList.add("active");
      };
    });
  }

  private setRangeSliders() {
    const rangeSliders = selectAll<HTMLInputElement>(".tech-range");

    rangeSliders &&
      rangeSliders.forEach((slider) => {
        slider.oninput = (event: Event) => {
          const element = event.target as HTMLInputElement;
          const { type, stat } = element?.dataset;

          if (!stat) return;

          const key = stat as keyof Stats;
          const value = parseInt(element.value);

          let statPoints;
          let difference;

          switch (type) {
            case UnitType.Infantry:
              statPoints = this.infantryStatPoints[key];
              difference = value - statPoints;

              if (difference > 0 && difference > this.points) {
                element.value = statPoints.toString();
                return;
              }

              this.infantryStatPoints[key] = value;
              this.points -= difference;
              break;
            case UnitType.Tank:
              statPoints = this.tankStatPoints[key];
              difference = value - statPoints;

              if (difference > 0 && difference > this.points) {
                element.value = statPoints.toString();
                return;
              }

              this.tankStatPoints[key] = value;
              this.points -= difference;
              break;
          }

          this.updatePointsUI();
        };
        slider.onchange = (event: Event) => {
          const element = event.target as HTMLInputElement;
          const { type, stat } = element?.dataset;

          if (!stat) return;

          const key = stat as keyof Stats;
          const value = parseInt(element.value);

          switch (type) {
            case UnitType.Infantry:
              this.infantryStatPoints[key] = value;
              break;
            case UnitType.Tank:
              this.tankStatPoints[key] = value;
              break;
          }

          this.updatePointsUI();
        };
      });
  }

  private updatePointsUI() {
    const element = select<HTMLSpanElement>(".points");
    if (!element) return;
    element.textContent = this.points.toString();
  }
}
