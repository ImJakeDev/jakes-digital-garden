const getRandomArrayIndex = <T>(array: readonly T[]): T => {
  if (array.length === 0) {
    throw new Error('getRandomArrayIndex called with an empty array');
  }
  return array[Math.floor(Math.random() * array.length)];
};

export default getRandomArrayIndex;
