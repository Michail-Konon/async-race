import { carNames } from './carGeneration_names';

export const getRandomName =  () => {
  const randomCarName = Math.floor(Math.random() * 50);

  return carNames[randomCarName];
};

export const getRandomColor =  () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor}`;
};

export type DescriptionCar = {
  [key: string | number]: number | string,
  id: number,
  name: string,
  color: string,
  wins: number,
  time: number
};

