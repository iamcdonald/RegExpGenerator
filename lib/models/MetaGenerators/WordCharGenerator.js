import Generator from '../base/Generator';
import UnicodeRangeSet from '../../utils/RandomCharacterGenerator/UnicodeRangeSet';
import UnicodeRange from '../../utils/RandomCharacterGenerator/UnicodeRange';

const wordCharRangeSet = new UnicodeRangeSet(
    new UnicodeRange('a', 'z'),
    new UnicodeRange('A', 'Z'),
    new UnicodeRange('0', '9'),
    new UnicodeRange('_', '_')
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
