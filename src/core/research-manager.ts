import { select } from "@/util";
import { GameManager } from "./game-manager";
import { TimerType } from "./types";
import { ResearchOption } from "@/model/research-option";
import { TankFactory as TankFactory } from "@/model/research-options/tank-factory";
import { IncreaseResearchSpeed } from "@/model/research-options/increase-research-speed";
import { IncreaseInfantryRecruitment } from "@/model/research-options/increase-infantry-recruitment";
import { TechCentreResearchOption } from "@/model/research-options/tech-centre-research-option";
import { IncreaseTankBuildSpeed } from "@/model/research-options/increase-tank-build-speed";
import { AddTechSkillPoint } from "@/model/research-options/add-tech-skill-point";
import { AutoDeployInfantryOption } from "@/model/research-options/auto-deploy-infantry-option";
import { IncreaseInfantryAutoDeploy } from "@/model/research-options/increase-infantry-auto-deploy";
import { AirBase } from "@/model/research-options/air-base";
import { IncreaseAircraftBuildSpeed } from "@/model/research-options/increase-aircraft-build-speed";

const optionsContainer = select<HTMLDivElement>("#research-points");

const researchOptionsMap = new Map<number, ResearchOption[]>([
  [1, [new IncreaseInfantryRecruitment()]],
  [2, [new AutoDeployInfantryOption(), new IncreaseResearchSpeed()]],
  [3, [new TankFactory()]],
  [5, [new IncreaseInfantryRecruitment()]],
  [6, [new TechCentreResearchOption(), new IncreaseTankBuildSpeed()]],
  [8, [new AddTechSkillPoint()]],
  [9, [new IncreaseInfantryAutoDeploy(), new IncreaseTankBuildSpeed()]],
  [11, [new AddTechSkillPoint()]],
  [12, [new AirBase()]],
  [13, [new AddTechSkillPoint(), new IncreaseInfantryAutoDeploy()]],
  [14, [new IncreaseAircraftBuildSpeed()]],
  [15, [new AddTechSkillPoint(2)]],
]);

const addResearchOptions = (gameManager: GameManager, level: number) => {
  const options = researchOptionsMap.get(level);

  if (!options) {
    if (level >= 10) {
      // Add skill points if we run out of options
      gameManager.researchOptions.push(new AddTechSkillPoint());
    }
    return;
  }

  options.forEach((option) => {
    if (!gameManager.researchOptions.some((o) => o.type === option.type)) {
      gameManager.researchOptions.push(option);
    }
  });
};

export const showResearchOptions = (gameManager: GameManager) => {
  optionsContainer?.classList.remove("d-none");
  generateResearchOptions(gameManager);
};

export const hideResearchOptions = () => {
  optionsContainer?.classList.add("d-none");
};

export const generateResearchOptions = (gameManager: GameManager) => {
  optionsContainer?.replaceChildren();

  addResearchOptions(gameManager, gameManager.player.level);

  gameManager.researchOptions.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option.title;
    button.classList.add("button");
    button.onclick = () => {
      // Remove the option from the list
      gameManager.researchOptions = gameManager.researchOptions.filter(
        (o) => o.type !== option.type
      );

      // Trigger the research option upgrade
      option.onSelect(gameManager);

      // Reset the timer
      const researchTimer = gameManager.timers.find(
        (timer) => timer.type === TimerType.PlayerResearch
      );
      researchTimer?.restart();
    };

    optionsContainer?.appendChild(button);
  });
};
