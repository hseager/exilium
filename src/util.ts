export function select<T>(selector: string) {
  const element = document.querySelector(selector);
  return element ? (element as T) : null;
}
