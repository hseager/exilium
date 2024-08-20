import { getRandomArrayItem, select } from "@/util";

const optionsContainer = select<HTMLDivElement>("#research-points");
const researchOptions = [
  // {
  //   name: "recruitment-speed",
  //   title: "Increase recruitment speed",
  // },
  {
    name: "new-unit",
    title: "Research new unit",
  },
  // {
  //   name: "tech-upgrades",
  //   title: "Research Tech upgrades",
  // },
];

export const showResearchOptions = () => {
  optionsContainer?.classList.remove("d-none");
  generateResearchOptions();
};

export const hideResearchOptions = () => {
  optionsContainer?.classList.add("d-none");
};

export const generateResearchOptions = () => {
  const option = getRandomArrayItem(researchOptions);

  const button = document.createElement("button");
  button.id = option.name;
  button.textContent = option.title;
  button.onclick = (event) => {
    console.log(event?.target);
  };

  optionsContainer?.replaceChildren(button);
};
