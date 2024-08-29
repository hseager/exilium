export function select<T extends Element>(selector: string) {
  const element = document.querySelector(selector);
  return element ? (element as T) : null;
}

export function selectAll<T extends Element>(
  selector: string
): NodeListOf<T> | null {
  const elements = document.querySelectorAll<T>(selector);
  return elements.length > 0 ? elements : null;
}

// export function getRandomArrayItem<T>(array: T[]): T {
//   const randomIndex = Math.floor(Math.random() * array.length);
//   return array[randomIndex];
// }
