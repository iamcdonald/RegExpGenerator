import Generator from '../base/Generator';
import UnicodeRangeSet from '../../utils/UnicodeRangeSet';
import UnicodeRange from '../../utils/UnicodeRange';

const verticalWhiteSpaceRangeSet = new UnicodeRangeSet(
    new UnicodeRange(0x000B, 0x000B),
    new UnicodeRange(0x000A, 0x000A),
  );


export default class VerticalWhiteSpaceGenerator extends Generator {

  chars = verticalWhiteSpaceRangeSet;

  constructor() {
    super(...arguments);
  }

  _generate() {
    return this.chars.getRandomCharacter();
  }
}
