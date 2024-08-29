import { select } from "@/util";
import { GameManager } from "./game-manager";
import { TimerType } from "./types";
import { ResearchOption } from "@/model/research-option";
import { WarFactory as WarFactory } from "@/model/research-options/war-factory";
import { IncreaseResearchSpeed } from "@/model/research-options/increase-research-speed";
import { IncreaseInfantryRecruitment } from "@/model/research-options/increase-infantry-recruitment";
import { TechCentreResearchOption } from "@/model/research-options/tech-centre-research-option";
import { IncreaseTankBuildSpeed } from "@/model/research-options/increase-tank-build-speed";

const optionsContainer = select<HTMLDivElement>("#research-points");

const researchOptionsMap = new Map<number, ResearchOption[]>([
  [1, [new IncreaseInfantryRecruitment()]],
  [2, [new IncreaseInfantryRecruitment(), new IncreaseResearchSpeed()]],
  [3, [new WarFactory()]],
  [5, [new IncreaseResearchSpeed()]],
  [6, [new TechCentreResearchOption(), new IncreaseTankBuildSpeed()]],
]);

const addResearchOptions = (gameManager: GameManager, level: number) => {
  const options = researchOptionsMap.get(level);

  if (!options) return;

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
