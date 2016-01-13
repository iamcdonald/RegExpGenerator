import unicodeRanges from './unicodeRanges';
import UnicodeRangeSet from './UnicodeRangeSet';

export const setDefaultAvailableRanges = ranges => {
  defaultAvailableRanges = new UnicodeRangeSet(ranges);
}

let defaultAvailableRanges = new UnicodeRangeSet(Object.keys(unicodeRanges).map(id => unicodeRanges[id]));

export default class RandomCharacterGenerator {

  _availableRanges;

  get availableRanges() {
    if (this._availableRanges) {
      return this._availableRanges;
    }
    return defaultAvailableRanges;
  }

  setAvailableRanges(ranges) {
    this._availableRanges = new UnicodeRangeSet(ranges);
  }

  getCharacter() {
    return this.availableRanges.getRandomCharacter();
  };

  getCharacterWithExclusions(exclusionRanges = []) {
    return this.availableRanges.subtract(exclusionRanges).getRandomCharacter();
  };

  getCharacterFromRanges(ranges) {
    return new UnicodeRangeSet(ranges).getRandomCharacter();
  }

}
