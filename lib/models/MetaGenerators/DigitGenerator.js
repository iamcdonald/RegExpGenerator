import Generator from '../base/Generator';
import UnicodeRangeSet from '../../utils/UnicodeRangeSet';
import UnicodeRange from '../../utils/UnicodeRange';

const wordCharRangeSet = new UnicodeRangeSet(
    new UnicodeRange('0', '9'),
  );


export default class WordCharGenerator extends Generator {

  chars = wordCharRangeSet;

  constructor() {
    super(...arguments);
  }

  _generate() {
    return this.chars.getRandomCharacter();
  }
}
