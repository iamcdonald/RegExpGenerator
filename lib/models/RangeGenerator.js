import Generator from './base/Generator';
import UnicodeRange from '../utils/RandomCharacterGenerator/UnicodeRange';
import wrap from '../utils/wrap';

export default class RangeGenerator extends Generator {

  constructor() {
    super(...arguments);
    this.start = wrap(this._parsedModel.start, this);
    this.end = wrap(this._parsedModel.end, this);
  }

  _generate() {
    return this.randomCharacterGenerator.getCharacterFromRanges(this.toUnicodeRange());
  }

  toUnicodeRange() {
    return new UnicodeRange(this.start.toCodePoint(), this.end.toCodePoint());
  }
}
