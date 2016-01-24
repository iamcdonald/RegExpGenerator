import Generator from './base/Generator';
import UnicodeRange from '../utils/UnicodeRange';

export default class LiteralGenerator extends Generator {

  _generate() {
    return this.content;
  }

  toUnicodeRange() {
    let codePoint = this.toCodePoint();
    return new UnicodeRange(codePoint, codePoint);
  }

  toCodePoint() {
    return this.content.codePointAt(0);
  }
}
