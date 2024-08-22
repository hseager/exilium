import { playerMaxLife } from "@/core/config";
import { select } from "@/util";

export class Player {
  maxLife = playerMaxLife;
  life = playerMaxLife;

  takeDamage(damage: number) {
    this.life -= damage;

    const damageBar = select<HTMLDivElement>(".damage");
    if (damageBar) damageBar.style.height = `${this.maxLife - this.life}%`;
  }
}
