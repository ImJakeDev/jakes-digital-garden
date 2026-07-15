const getRandomArrayIndex = <T>(array: readonly T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

export default getRandomArrayIndex;
