import Generator from '../base/Generator';
import UnicodeRangeSet from '../../utils/UnicodeRangeSet';
import UnicodeRange from '../../utils/UnicodeRange';

const whiteSpaceRangeSet = new UnicodeRangeSet(
    new UnicodeRange(0x0009, 0x0009),
    new UnicodeRange(0x000A, 0x000A),
    new UnicodeRange(0x000C, 0x000C),
    new UnicodeRange(0x000D, 0x000D)
  );


export default class WhiteSpaceGenerator extends Generator {

  chars = whiteSpaceRangeSet;

  constructor() {
    super(...arguments);
  }

  _generate() {
    return this.chars.getRandomCharacter();
  }
}
