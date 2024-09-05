import { Unit } from "@/model/unit";
import { GameManager } from "./game-manager";

export class CombatManager {
  // Maps each unit to a set of opponents it's currently in combat with
  private unitsInCombat: Map<Unit, Set<Unit>> = new Map();

  // Updates combat states for all units in combat
  public update(delta: number, gameManager: GameManager) {
    this.unitsInCombat.forEach((opponents, unit) => {
      opponents.forEach((opponent) => {
        this.handleCombat(unit, opponent, delta, gameManager);
      });
    });
  }

  // Handles the combat logic between two units
  private handleCombat(
    unit: Unit,
    opponent: Unit,
    deltaTime: number,
    gameManager: GameManager
  ) {
    const attackCooldown = 1000 / unit.stats.attackSpeed; // Attack cooldown in milliseconds

    // Update attack timings
    unit.lastAttackTime = (unit.lastAttackTime || 0) + deltaTime;
    opponent.lastAttackTime = (opponent.lastAttackTime || 0) + deltaTime;

    if (unit.lastAttackTime >= attackCooldown) {
      // Apply damage to the opponent
      opponent.stats.health -= this.getAttackRange(unit.stats.attack);
      unit.lastAttackTime = 0; // Reset attack timer

      // Check if any units have been defeated
      if (opponent.stats.health <= 0) {
        this.removeCombatUnit(opponent, gameManager);
      }
      if (unit.stats.health <= 0) {
        this.removeCombatUnit(unit, gameManager);
      }
    }
  }

  private getAttackRange(attack: number): number {
    // Generate a random number between -1, 0, and 1
    const variation = Math.floor(Math.random() * 3) - 1;

    // Return the modified attack value
    return attack + variation;
  }

  // Adds a unit and its opponent to the combat tracking
  public addCombatUnit(unit: Unit, opponent: Unit) {
    if (!this.unitsInCombat.has(unit)) {
      this.unitsInCombat.set(unit, new Set());
    }
    this.unitsInCombat.get(unit)!.add(opponent);

    if (!this.unitsInCombat.has(opponent)) {
      this.unitsInCombat.set(opponent, new Set());
    }
    this.unitsInCombat.get(opponent)!.add(unit);
  }

  // Removes a unit from combat and cleans up any references to it
  public removeCombatUnit(unit: Unit, gameManager: GameManager) {
    if (this.unitsInCombat.has(unit)) {
      // Remove this unit from its opponents' sets
      this.unitsInCombat.get(unit)!.forEach((opponent) => {
        this.unitsInCombat.get(opponent)!.delete(unit);
        if (this.unitsInCombat.get(opponent)!.size === 0) {
          this.unitsInCombat.delete(opponent);
        }
      });

      // Remove the unit from the combat map
      this.unitsInCombat.delete(unit);
    }

    // Remove the unit from the game manager's units
    gameManager.units = gameManager.units.filter((u) => u !== unit);
  }
}
