import { ResearchType } from "@/core/types";

export class ResearchOption {
  type: ResearchType;

  constructor(type: ResearchType) {
    this.type = type;
  }
}
