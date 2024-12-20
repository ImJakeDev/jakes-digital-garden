import { useEffect, useState } from 'react';
import EmojiHexCodes from 'emojibase-data/meta/hexcodes.json';

// WIP

/*
 * https://github.com/milesj/emojibase
 * * https://emojibase.dev/
 * https://home.unicode.org/
 * * https://home.unicode.org/emoji/about-emoji/
 * * https://unicode.org/emoji/techindex.html
 * * https://en.wikipedia.org/wiki/Unicode
 * * https://www.unicode.org/main.html
 * https://www.unicode.org/Public/emoji/latest/
 * * https://www.unicode.org/Public/emoji/latest/emoji-sequences.txt
 * https://emojipedia.org/
 * * https://emojipedia.org/emoji-mashup/twitter/twemoji-14.0?a=%F0%9F%98%9D&b=%F0%9F%91%BF
 * https://github.com/trantlabs/emoji-mashup
 * * https://github.com/trantlabs/emoji-mashup/blob/master/src/index.ts#L111
 */

const decodeHtmlEntities = (text: string) => {
  const element = document.createElement('div');
  element.innerHTML = text;
  return element.textContent || element.innerText || '';
};

const useRandomEmoji = () => {
  // Todo: Make more customizable via props like groups and subgroups.
  // Todo: Check if the emoji is supported by the browser
  // Todo: Check if the emoji is supported by the operating system
  // Todo: Check if the emoji is supported by the font
  // Todo: Check if the emoji is supported by the device
  // Todo: Figure out if "Format" logic is necessary
  /*
   # Format: code points; status # emoji name
   #     Code points — list of one or more hex code points, separated by spaces
   #     Status
   #       component           — an Emoji_Component,
   #                             excluding Regional_Indicators, ASCII, and non-Emoji.
   #       fully-qualified     — a fully-qualified emoji (see ED-18 in UTS #51),
   #                             excluding Emoji_Component
   #       minimally-qualified — a minimally-qualified emoji (see ED-18a in UTS #51)
   #       unqualified         — a unqualified emoji (See ED-19 in UTS #51)
   */
  // console.log('groups', EmojiMeta.groups);
  // console.log('subgroups', EmojiMeta.subgroups);
  // console.log('hierarchy', EmojiMeta.hierarchy);
  // console.log('EmojiUnicode', EmojiUnicode);
  // console.log('EmojiUnicodeNames', EmojiUnicodeNames);
  // console.log('EmojiHexCodes', EmojiHexCodes);

  const [emoji, setEmoji] = useState<JSX.Element>(<></>);

  useEffect(() => {
    const keys = Object.keys(EmojiHexCodes);
    if (!keys.length) {
      setEmoji(<></>);
      return;
    }

    const randomIndex = Math.floor(Math.random() * keys.length);
    const randomKey = keys[randomIndex];

    const emojiHexCode = randomKey
      .split('-')
      .map((code) => `&#x${code};`)
      .join('');

    const emojiCharacter = decodeHtmlEntities(emojiHexCode);

    setEmoji(<>{emojiCharacter}</>);
  }, []);

  return emoji;
};

export default useRandomEmoji;
