// List is from https://prowritingaid.com/list-of-words-not-capitalized-in-titles
const LOWERCASE_WORDS = [
  'a',
  'and',
  'as',
  'at',
  'but',
  'by',
  'down',
  'for',
  'from',
  'if',
  'in',
  'into',
  'like',
  'near',
  'nor',
  'of',
  'off',
  'on',
  'once',
  'onto',
  'or',
  'over',
  'past',
  'so',
  'than',
  'that',
  'to',
  'upon',
  'when',
  'with',
  'yet',
] as const;

type LowercaseWord = (typeof LOWERCASE_WORDS)[number];

interface TitleCaseOptions {
  useStandardRules?: boolean;
  capitalizeWords?: LowercaseWord[];
}

const toTitleCase = (string: string, options?: Partial<TitleCaseOptions>) => {
  const { useStandardRules = true, capitalizeWords = [] } = options ?? {};

  const processWord = (word: string, isFirst = false, isLast = false): string => {
    if (!word) return word;

    const lowercaseWord = word.toLowerCase();

    // Always capitalize first and last words
    if (isFirst || isLast) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }

    // If standard rules are enabled and word should be lowercase
    if (useStandardRules && LOWERCASE_WORDS.includes(lowercaseWord as LowercaseWord)) {
      // Check if word should be capitalized anyway based on capitalizeWords array
      if (capitalizeWords.includes(lowercaseWord as LowercaseWord)) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
      return lowercaseWord;
    }

    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };

  const processWords = (words: string[]): string => {
    return words
      .filter((word) => word.length > 0)
      .map((word, index, array) => processWord(word, index === 0, index === array.length - 1))
      .join(' ');
  };

  if (string.includes('-')) {
    return processWords(string.split('-'));
  }

  if (string.includes('_')) {
    return processWords(string.split('_'));
  }

  return processWords(string.toLowerCase().split(' '));
};

export default toTitleCase;
