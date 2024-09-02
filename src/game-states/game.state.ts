import { Building, Faction, Mode, Pylon, State, UnitType } from "@/core/types";
import { drawEngine } from "@/core/draw-engine";
import { controls } from "@/core/controls";
import { gameStateMachine } from "@/game-state-machine";
import { menuState } from "@/game-states/menu.state";
import { GameManager } from "@/core/game-manager";
import {
  aircraftStyle,
  getFactionTheme,
  pylonDamageRange,
  pylonHexCodes,
  pylonWidth,
  pylonY,
  safeZoneConfig,
  tankStyle,
  wallConfig,
} from "@/core/config";
import { winState } from "./win.state";
import {
  drawBackground,
  drawBoard,
  drawClouds,
  drawRoad,
  drawSafeZone,
  drawSkyline,
  drawSun,
  drawWall,
} from "@/core/scene";
import { loseState } from "./lose.state";
import { CombatManager } from "@/core/combat-manager";
import { Unit } from "@/model/unit";
import { select } from "@/util";

class GameState implements State {
  private pylonSprite = new Image();
  private ctx;
  private gameManager;
  private buildings: Building[];
  private combatManager;

  constructor() {
    this.ctx = drawEngine.context;
    this.pylonSprite.src = "pylon.png";
    this.gameManager = new GameManager();
    this.buildings = [];
    this.combatManager = new CombatManager();
  }

  onEnter() {
    this.gameManager = new GameManager();
    this.initializeSkyline();
    select<HTMLDivElement>(".damage-meter")?.classList.remove("d-none");
    select<HTMLDivElement>(".controls")?.classList.remove("d-none");
  }

  onUpdate(delta: number) {
    drawBackground(this.ctx);
    drawSun(this.ctx);
    drawClouds(this.ctx);
    drawSkyline(this.ctx, this.buildings);
    drawBoard(this.ctx);
    drawRoad(this.ctx);
    this.drawPylons();
    drawWall(this.ctx);
    drawSafeZone(this.ctx);
    this.drawUnits(delta);

    this.handleUnitPlacement();

    this.gameManager.updateTimers(delta);

    if (controls.isEscape) {
      gameStateMachine.setState(menuState);
    }

    this.checkWinCondition();
    this.checkLoseCondition();
  }

  private checkWinCondition() {
    if (this.gameManager.pylons.every((p) => p.life <= 20)) {
      gameStateMachine.setState(winState);
    }
  }

  private checkLoseCondition() {
    if (this.gameManager.player.life <= 0) {
      gameStateMachine.setState(loseState);
    }
  }

  private handleUnitPlacement() {
    if (this.gameManager.mode == Mode.PlaceUnit) {
      const xPadding = 40;
      let x = drawEngine.mousePosition.x;
      const y = drawEngine.canvasHeight - 25;

      if (x < xPadding) x = xPadding;
      if (x > drawEngine.canvasWidth - xPadding)
        x = drawEngine.canvasWidth - xPadding;

      const theme = getFactionTheme(Faction.Vanguard);

      this.ctx.beginPath();
      this.ctx.fillStyle = theme.fill;
      this.ctx.strokeStyle = theme.border;

      this.gameManager?.unitToDeploy?.draw(this.ctx, x, y);

      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }

  private initializeSkyline() {
    const maxHeight = 80;
    const minHeight = 120;
    const minWidth = 20;
    const maxWidth = 100;

    let currentX = 0;

    while (currentX < drawEngine.canvasWidth) {
      const buildingWidth =
        Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth;
      const buildingHeight =
        Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;

      const building: Building = {
        x: currentX,
        y: buildingHeight,
        width: buildingWidth,
        height: 100 + buildingHeight,
        lights: this.generateLights(
          currentX,
          buildingHeight,
          buildingWidth,
          buildingHeight
        ),
      };

      this.buildings.push(building);

      currentX += buildingWidth;
    }
  }

  private generateLights(
    x: number,
    y: number,
    buildingWidth: number,
    buildingHeight: number
  ) {
    const lights = [];
    const lightSize = 3;
    const lightSpacing = 10;

    for (
      let lx = x + lightSpacing;
      lx < x + buildingWidth - lightSpacing;
      lx += lightSpacing
    ) {
      for (
        let ly = y + lightSpacing;
        ly < y + buildingHeight - lightSpacing;
        ly += lightSpacing
      ) {
        if (Math.random() > 0.75) {
          // 30% chance to add a light
          lights.push({ x: lx, y: ly, size: lightSize });
        }
      }
    }

    return lights;
  }

  private drawPylons() {
    const spacing = drawEngine.canvasWidth / this.gameManager.pylons.length - 5;

    this.gameManager.pylons.forEach((pylon, i) => {
      const x = spacing * (i + 1) - pylonWidth / 2;

      // Check for units damaging them
      this.gameManager.units
        .filter((unit) => unit.faction === Faction.Vanguard)
        .forEach((unit) => {
          const distance = Math.sqrt(
            (unit.position.x - x) ** 2 + (unit.position.y - pylonY) ** 2
          );

          if (distance <= pylonDamageRange && !unit.hasAttackedPylon) {
            // Apply damage to the pylon
            pylon.life -= unit.stats.attack;
            unit.hasAttackedPylon = true;
          }
        });

      this.drawPylon(x, pylonY, pylon, pylonHexCodes[i]);
    });
  }

  private drawPylon(x: number, y: number, pylon: Pylon, glowColour: string) {
    const originalHeight = 100; // Assuming the original height of the pylon sprite is 100px
    const clippedHeight = (pylon.life / pylon.maxLife) * originalHeight;

    this.ctx.save(); // Save the current state of the canvas

    // Define the clipping region
    this.ctx.beginPath();
    this.ctx.rect(x, y + (originalHeight - clippedHeight), 40, clippedHeight);
    this.ctx.clip();

    this.ctx.shadowColor = glowColour;
    this.ctx.shadowBlur = 4;
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 0;

    // Draw the pylon image within the clipped region
    this.ctx.drawImage(this.pylonSprite, x, y, 40, originalHeight);

    this.ctx.shadowColor = "transparent";
    this.ctx.shadowBlur = 0;

    this.ctx.restore(); // Restore the canvas to its original state
  }

  private checkCollision(unit: Unit, otherUnit: Unit) {
    if (unit.type === UnitType.Infantry) {
      return (
        otherUnit.faction !== unit.faction &&
        Math.hypot(
          unit.position.x - otherUnit.position.x,
          unit.position.y - otherUnit.position.y
        ) <
          unit.stats.range + otherUnit.stats.range
      );
    } else if (unit.type === UnitType.Tank) {
      return (
        otherUnit.faction !== unit.faction &&
        Math.hypot(
          unit.position.x - tankStyle.width / 2 - otherUnit.position.x,
          unit.position.y - tankStyle.height / 2 - otherUnit.position.y
        ) <
          unit.stats.range + otherUnit.stats.range
      );
    } else if (unit.type === UnitType.Aircraft) {
      return (
        otherUnit.faction !== unit.faction &&
        Math.hypot(
          unit.position.x - aircraftStyle.width / 2 - otherUnit.position.x,
          unit.position.y - aircraftStyle.height / 2 - otherUnit.position.y
        ) <
          unit.stats.range + otherUnit.stats.range
      );
    }
  }

  private drawUnits(delta: number) {
    this.gameManager.units = this.gameManager.units?.filter((unit) => {
      // Check for nearby opposing units
      const opponent = this.gameManager.units.find((otherUnit) => {
        return this.checkCollision(unit, otherUnit);
      });

      if (opponent) {
        // Manage combat state
        // Units do not move if they are engaged in combat
        this.combatManager.addCombatUnit(unit, opponent);
      } else {
        // Reset lastAttackTime when not in combat
        unit.lastAttackTime = undefined;

        // Handle movement
        if (unit.faction === Faction.Vanguard) {
          if (unit.position.y <= wallConfig.y) return false;
          unit.position.y -= unit.stats.moveSpeed;
        } else if (unit.faction === Faction.Dominus) {
          if (unit.position.y >= drawEngine.canvasHeight - safeZoneConfig.y) {
            this.gameManager.player.takeDamage(unit.stats.attack);
            return false;
          }
          unit.position.y += unit.stats.moveSpeed;
        }

        // Remove from combat if they are not in combat
        this.combatManager.removeCombatUnit(unit, this.gameManager);
      }

      // Draw the unit
      unit.draw(this.ctx);

      return true; // Keep this unit in the new array
    });

    // Update combat manager
    this.combatManager.update(delta, this.gameManager);
  }
}

export const gameState = new GameState();
