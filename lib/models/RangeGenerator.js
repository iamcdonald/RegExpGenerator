import Generator from './base/Generator';
import UnicodeRange from '../utils/RandomCharacterGenerator/UnicodeRange';

const asCP = char => char.codePointAt(0);

export default class RangeGenerator extends Generator {

  _generate() {
    return this.randomCharacterGenerator.getCharacterFromRanges(this.toUnicodeRange());
  }

  toUnicodeRange() {
    return new UnicodeRange(asCP(this._parsedModel.start), asCP(this._parsedModel.end));
  }
}
