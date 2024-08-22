import { Unit } from "@/model/unit";
import { GameManager } from "./game-manager";

export class CombatManager {
  private unitsInCombat: Map<Unit, Unit> = new Map(); // Maps attacking unit to the opponent

  public update(delta: number, gameManager: GameManager) {
    this.unitsInCombat.forEach((opponent, unit) => {
      this.handleCombat(unit, opponent, delta, gameManager);
    });
  }

  private handleCombat(
    unit: Unit,
    opponent: Unit,
    deltaTime: number,
    gameManager: GameManager
  ) {
    const attackCooldown = 1000 / unit.stats.attackSpeed; // Attack cooldown in milliseconds
    const opponentAttackCooldown = 1000 / opponent.stats.attackSpeed;

    // Update attack timings
    unit.lastAttackTime = (unit.lastAttackTime || 0) + deltaTime;
    opponent.lastAttackTime = (opponent.lastAttackTime || 0) + deltaTime;

    if (unit.lastAttackTime >= attackCooldown) {
      // Apply damage to the opponent
      opponent.stats.health -= unit.stats.attack;
      unit.lastAttackTime = 0; // Reset attack timer

      // Check if the opponent should retaliate
      if (opponent.lastAttackTime >= opponentAttackCooldown) {
        unit.stats.health -= opponent.stats.attack;
        opponent.lastAttackTime = 0; // Reset opponent's attack timer
      }

      // Remove defeated units
      if (unit.stats.health <= 0) {
        gameManager.units = gameManager.units.filter((u) => u !== unit);
        this.unitsInCombat.delete(unit);
      }
      if (opponent.stats.health <= 0) {
        gameManager.units = gameManager.units.filter((u) => u !== opponent);
        this.unitsInCombat.delete(opponent);
      }
    }
  }

  public addCombatUnit(unit: Unit, opponent: Unit) {
    this.unitsInCombat.set(unit, opponent);
  }

  public removeCombatUnit(unit: Unit) {
    this.unitsInCombat.delete(unit);
  }
}
