// the collisions layer exported from Tiled as is
import { MAP_ENUMS } from "./map/enums";

const collisionsRaw = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1816, 1816,
  1816, 1816, 1816, 1816, 1816, 1816, 1816, 1816, 0, 1816, 1816, 1816, 1816,
  1816, 1816, 1816, 0, 1816, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1816, 1816, 0, 0, 0, 0,
  0, 0, 0, 1816, 1816, 1816, 1816, 1816, 1816, 1816, 1816, 0, 0, 0, 1816, 1816,
  0, 1816, 1816, 0, 1816, 1816, 0, 1816, 1816, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1816,
  1816, 0, 0, 0, 0, 0, 0, 0, 1816, 1816, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1816, 0,
  0, 0, 0, 0, 0, 0, 1816, 0, 1816, 1816, 1816, 1816, 1816, 1816, 0, 1816, 1816,
  1816, 1816, 1816, 0, 1816, 1816, 0, 0, 1816, 1816, 0, 1816, 1816, 0, 0, 0, 0,
  0, 0, 1816, 0, 1816, 0, 0, 0, 0, 1816, 1816, 0, 1816, 1816, 0, 0, 0, 0, 0, 0,
  0, 0, 1816, 1816, 1816, 0, 0, 0, 0, 0, 0, 0, 1816, 0, 1816, 1816, 1816, 1816,
  1816, 1816, 0, 0, 0, 0, 0, 0, 0, 1816, 1816, 1816, 1816, 1816, 0, 0, 0, 0, 0,
  0, 0, 1816, 0, 0, 0, 0, 0, 0, 0, 1816, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1816,
  0, 0, 0, 0, 0, 0, 0, 1816, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1816, 0, 0, 0, 0,
  0, 0, 0, 1816, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1816, 0, 0, 0, 0, 0, 0, 0,
  1816, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1816, 1816, 1816, 0, 1816, 1816,
  1816, 0, 0, 0, 0, 0, 0,
];

export const collisions: number[][] = [];

for (let i = 0; i < collisionsRaw.length; i += MAP_ENUMS.MAP_WIDTH) {
  collisions.push(collisionsRaw.slice(i, i + MAP_ENUMS.MAP_WIDTH));
}
