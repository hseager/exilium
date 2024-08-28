import { select } from "@/util";
import { GameManager } from "./game-manager";
import { TimerType } from "./types";
import { ResearchOption } from "@/model/research-option";
import { WarFactoryResearchOption } from "@/model/research-options/war-factory-research-option";
import { UpgradeInfantryResearchOption } from "@/model/research-options/upgrade-infantry-research-option";

const optionsContainer = select<HTMLDivElement>("#research-points");
// const researchOptions = [
//   // {
//   //   name: "recruitment-speed",
//   //   title: "Increase recruitment speed",
//   // },
//   {
//     name: "new-unit",
//     title: "Research new unit",
//   },
//   // {
//   //   name: "tech-upgrades",
//   //   title: "Research Tech upgrades",
//   // },
// ];

export const defaultResearchOption = new UpgradeInfantryResearchOption();

export const researchOptions: { [key: number]: ResearchOption } = {
  1: new WarFactoryResearchOption(),
  2: new UpgradeInfantryResearchOption(),
};

const getResearchOptions = (level: number): ResearchOption => {
  return researchOptions[level] ?? defaultResearchOption;
};

export const showResearchOptions = (gameManager: GameManager) => {
  optionsContainer?.classList.remove("d-none");
  generateResearchOptions(gameManager);
};

export const hideResearchOptions = () => {
  optionsContainer?.classList.add("d-none");
};

export const generateResearchOptions = (gameManager: GameManager) => {
  const option = getResearchOptions(gameManager.player.level);

  const button = document.createElement("button");
  button.id = option.name;
  button.textContent = option.title;
  button.classList.add("button");
  button.onclick = () => {
    option.onSelect(gameManager);
    const researchTimer = gameManager.timers.find(
      (timer) => timer.type === TimerType.PlayerResearch
    );
    researchTimer?.restart();
  };

  optionsContainer?.replaceChildren(button);
};
