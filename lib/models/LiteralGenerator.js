import Generator from './base/Generator';
import UnicodeRange from '../utils/RandomCharacterGenerator/UnicodeRange';

export default class LiteralGenerator extends Generator {

  _generate() {
    return this.content;
  }

  toUnicodeRange() {
    let codePoint = this.content.codePointAt(0);
    return new UnicodeRange(codePoint, codePoint);
  }
}
