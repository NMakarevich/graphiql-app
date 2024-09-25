export function getRandomID() {
  return Math.random()
    .toString(36)
    .slice(2)
    .padEnd(16, Math.random().toString(36).slice(2));
}
