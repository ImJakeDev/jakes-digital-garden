const toTitleCase = (string: string) => {
  return string.includes('-')
    ? string
        .split('-')
        .map((word) => {
          return word.replace(word[0], word[0].toUpperCase());
        })
        .join(' ')
    : string.includes('-')
      ? string
          .split('_')
          .map((word) => {
            return word.replace(word[0], word[0].toUpperCase());
          })
          .join(' ')
      : string
          .toLowerCase()
          .split(' ')
          .map((word) => {
            return word.replace(word[0], word[0].toUpperCase());
          })
          .join(' ');
};

export default toTitleCase;
