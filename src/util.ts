export function select<T>(selector: string) {
  const element = document.querySelector(selector);
  return element ? (element as T) : null;
}

export function getRandomArrayItem<T>(array: T[]): T {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
