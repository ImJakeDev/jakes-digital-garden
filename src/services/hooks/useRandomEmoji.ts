import { useQuery } from '@tanstack/react-query';
import { fetchEmojis, Emoji } from 'emojibase';
import EmojiMeta from 'emojibase-data/meta/groups.json';
import filter from 'lodash.filter';

type SubGroup =
  | 'alphanum'
  | 'animal-amphibian'
  | 'animal-bird'
  | 'animal-bug'
  | 'animal-mammal'
  | 'animal-marine'
  | 'animal-reptile'
  | 'arrow'
  | 'arts-crafts'
  | 'av-symbol'
  | 'award-medal'
  | 'body-parts'
  | 'book-paper'
  | 'cat-face'
  | 'clothing'
  | 'computer'
  | 'country-flag'
  | 'currency'
  | 'dishware'
  | 'drink'
  | 'emotion'
  | 'event'
  | 'face-affection'
  | 'face-concerned'
  | 'face-costume'
  | 'face-glasses'
  | 'face-hand'
  | 'face-hat'
  | 'face-negative'
  | 'face-neutral-skeptical'
  | 'face-sleepy'
  | 'face-smiling'
  | 'face-tongue'
  | 'face-unwell'
  | 'family'
  | 'flag'
  | 'food-asian'
  | 'food-fruit'
  | 'food-prepared'
  | 'food-sweet'
  | 'food-vegetable'
  | 'game'
  | 'gender'
  | 'geometric'
  | 'hair-style'
  | 'hand-fingers-closed'
  | 'hand-fingers-open'
  | 'hand-fingers-partial'
  | 'hand-prop'
  | 'hand-single-finger'
  | 'hands'
  | 'heart'
  | 'hotel'
  | 'household'
  | 'keycap'
  | 'light-video'
  | 'lock'
  | 'mail'
  | 'math'
  | 'medical'
  | 'money'
  | 'monkey-face'
  | 'music'
  | 'musical-instrument'
  | 'office'
  | 'other-object'
  | 'other-symbol'
  | 'person-activity'
  | 'person-fantasy'
  | 'person-gesture'
  | 'person-resting'
  | 'person-role'
  | 'person-sport'
  | 'person-symbol'
  | 'person'
  | 'phone'
  | 'place-building'
  | 'place-geographic'
  | 'place-map'
  | 'place-other'
  | 'place-religious'
  | 'plant-flower'
  | 'plant-other'
  | 'punctuation'
  | 'religion'
  | 'science'
  | 'skin-tone'
  | 'sky-weather'
  | 'sound'
  | 'sport'
  | 'subdivision-flag'
  | 'time'
  | 'tool'
  | 'transport-air'
  | 'transport-ground'
  | 'transport-sign'
  | 'transport-water'
  | 'warning'
  | 'writing'
  | 'zodiac';

type Group = 'activities' | 'animals-nature' | 'component' | 'flags' | 'food-drink' | 'objects' | 'people-body' | 'smileys-emotion' | 'symbols' | 'travel-places';

type Exclude = {
  groups?: Group[];
  subGroups?: SubGroup[];
};

const fetchRandomEmoji = () => {
  // https://github.com/milesj/emojibase
  const emojiData = fetchEmojis('en');

  return emojiData;
};

const useRandomEmoji = ({ groups = ['people-body', 'smileys-emotion', 'symbols', 'travel-places', 'flags'], subGroups = ['body-parts', 'clothing', 'event', 'family', 'skin-tone', 'sport', 'arrow'] }: Exclude) => {
  return useQuery({
    queryKey: ['RandomEmoji', groups, subGroups],
    queryFn: () => fetchRandomEmoji(),
    staleTime: Infinity,
    select: (emojiData): Emoji => {
      // Todo: label: "root vegetable" Has a bug rendering the emoji on my device (MacOS: 14.6.1 (23G93))
      // Todo: Check for OS, Browser, and Device rendering compatibility

      const groupExclusions = groups;
      const subgroupExclusions = subGroups;

      const switchKeysAndValues = <T extends Record<string, string>>(obj: T): Record<string, keyof T> => {
        return Object.entries(obj).reduce(
          (acc, [key, value]) => {
            acc[value] = key;
            return acc;
          },
          {} as Record<string, keyof T>
        );
      };

      const emojiMetaGroups = switchKeysAndValues(EmojiMeta.groups);
      const emojiMetaSubGroups = switchKeysAndValues(EmojiMeta.subgroups);

      const excludedGroups = groupExclusions?.map((group) => emojiMetaGroups[group]);
      const excludedSubGroups = subgroupExclusions?.map((subgroup) => emojiMetaSubGroups[subgroup]);

      const filteredEmojiDataForGroups = filter(emojiData, (emoji) => {
        return !excludedGroups.some((excludedGroup) => {
          return !!emoji.group ? String(emoji.group) === excludedGroup : true;
        });
      });

      const filteredEmojiDataForSubGroups = filter(filteredEmojiDataForGroups, (emoji) => {
        return !excludedSubGroups.some((excludedSubGroup) => {
          return !!emoji.subgroup ? String(emoji.subgroup) === excludedSubGroup : true;
        });
      });

      const randomModifiedIndex = Math.floor(Math.random() * filteredEmojiDataForSubGroups.length);
      const randomModifiedEmoji = filteredEmojiDataForSubGroups[randomModifiedIndex];

      return randomModifiedEmoji;
    },
  });
};

export default useRandomEmoji;
