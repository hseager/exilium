import { Stats, UnitType } from "@/core/types";
import { select, selectAll } from "@/util";

export class TechCentre {
  points = 4;
  infantryStatPoints: Stats;
  tankStatPoints: Stats;
  aircraftStatPoints: Stats;

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

    this.aircraftStatPoints = {
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

  // Closure renames object properties so we need to map the string values manually rather than this.infantryStatPoints[key]
  // Seemed a better solution than converting them to string keys which means we have to remember to conditionally call this.stats["attack"]
  // rather than this.stats.attack only for stats. Seemed dangerous
  // Not ideal but probably the lesser evil ...
  private getStat(name: string, type: string) {
    if (type === UnitType.Infantry) {
      if (name === "attack") {
        return this.infantryStatPoints.attack;
      } else if (name === "attackSpeed") {
        return this.infantryStatPoints.attackSpeed;
      } else if (name === "health") {
        return this.infantryStatPoints.health;
      } else if (name === "moveSpeed") {
        return this.infantryStatPoints.moveSpeed;
      } else if (name === "range") {
        return this.infantryStatPoints.range;
      }
    } else if (type === UnitType.Tank) {
      if (name === "attack") {
        return this.tankStatPoints.attack;
      } else if (name === "attackSpeed") {
        return this.tankStatPoints.attackSpeed;
      } else if (name === "health") {
        return this.tankStatPoints.health;
      } else if (name === "moveSpeed") {
        return this.tankStatPoints.moveSpeed;
      } else if (name === "range") {
        return this.tankStatPoints.range;
      }
    } else if (type === UnitType.Aircraft) {
      if (name === "attack") {
        return this.aircraftStatPoints.attack;
      } else if (name === "attackSpeed") {
        return this.aircraftStatPoints.attackSpeed;
      } else if (name === "health") {
        return this.aircraftStatPoints.health;
      } else if (name === "moveSpeed") {
        return this.aircraftStatPoints.moveSpeed;
      } else if (name === "range") {
        return this.aircraftStatPoints.range;
      }
    }

    return this.infantryStatPoints.attack;
  }

  setStat(name: string, type: string, value: number) {
    if (type === UnitType.Infantry) {
      if (name === "attack") {
        this.infantryStatPoints.attack = value;
      } else if (name === "attackSpeed") {
        this.infantryStatPoints.attackSpeed = value;
      } else if (name === "health") {
        this.infantryStatPoints.health = value;
      } else if (name === "moveSpeed") {
        this.infantryStatPoints.moveSpeed = value;
      } else if (name === "range") {
        this.infantryStatPoints.range = value;
      }
    } else if (type === UnitType.Tank) {
      if (name === "attack") {
        this.tankStatPoints.attack = value;
      } else if (name === "attackSpeed") {
        this.tankStatPoints.attackSpeed = value;
      } else if (name === "health") {
        this.tankStatPoints.health = value;
      } else if (name === "moveSpeed") {
        this.tankStatPoints.moveSpeed = value;
      } else if (name === "range") {
        this.tankStatPoints.range = value;
      }
    } else if (type === UnitType.Aircraft) {
      if (name === "attack") {
        this.aircraftStatPoints.attack = value;
      } else if (name === "attackSpeed") {
        this.aircraftStatPoints.attackSpeed = value;
      } else if (name === "health") {
        this.aircraftStatPoints.health = value;
      } else if (name === "moveSpeed") {
        this.aircraftStatPoints.moveSpeed = value;
      } else if (name === "range") {
        this.aircraftStatPoints.range = value;
      }
    }
  }

  private setRangeSliders() {
    const rangeSliders = selectAll<HTMLInputElement>(".tech-range");

    rangeSliders &&
      rangeSliders.forEach((slider) => {
        slider.oninput = (event: Event) => {
          const element = event.target as HTMLInputElement;
          const { type, stat } = element?.dataset;

          if (!stat || !type) return;

          const value = parseInt(element.value, 10);

          const statPoints = this.getStat(stat, type);
          const difference = value - statPoints;

          if (difference > 0 && difference > this.points) {
            element.value = statPoints.toString();
            return;
          }

          this.setStat(stat, type, value);
          this.points -= difference;

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
