import { playerMaxLife } from "@/core/config";

export class Player {
  maxLife = playerMaxLife;
  life = playerMaxLife;

  takeDamage(damage: number) {
    this.life -= damage;
  }
}
