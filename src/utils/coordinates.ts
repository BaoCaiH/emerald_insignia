export const toGridCoord = (x: number, y: number, tileSize: number = 16) => {
  return { x: x * tileSize, y: y * tileSize };
};

export const fromGridCoord = (x: number, y: number, tileSize: number = 16) => {
  return { x: x / tileSize, y: y / tileSize };
};

export const zipCoordToString = (x: number, y: number) => {
  return `${x},${y}`;
};

export const toGridCoordString = (
  x: number,
  y: number,
  tileSize: number = 16
) => {
  return zipCoordToString(x * tileSize, y * tileSize);
};

export const nextPosition = (
  x: number,
  y: number,
  direction: string,
  tileSize: number = 16
) => {
  if (direction === "left") return { x: x - tileSize, y: y };
  else if (direction === "right") return { x: x + tileSize, y: y };
  else if (direction === "up") return { x: x, y: y - tileSize };
  else if (direction === "down") return { x: x, y: y + tileSize };
  else return { x: x, y: y };
};
