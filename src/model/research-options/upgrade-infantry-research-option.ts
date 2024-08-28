import { ResearchOption } from "../research-option";

export class UpgradeInfantryResearchOption extends ResearchOption {
  constructor() {
    const name = "upgrade-infantry";
    const title = "Upgrade Infantry";

    super(name, title);
  }

  onSelect() {
    console.log("Upgrade infantry");
  }
}
