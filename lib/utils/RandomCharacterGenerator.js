import unicodeRanges from './unicodeRanges';
import UnicodeRange from './UnicodeRange';
import UnicodeRangeSet from './UnicodeRangeSet';
import parseRegexToUnicodeRanges from './parseRegexToUnicodeRanges';

const isRegex = data => {
  return data instanceof RegExp;
}

const isString = data => {
  return typeof data === 'string'
}

const isUnicodeRange = data => {
  return data instanceof UnicodeRange;
}

const convertToUnicodeRange = item => {
  if (isUnicodeRange(item)) {
    return item;
  }
  if (isRegex(item) || isString(item)) {
    return parseRegexToUnicodeRanges(item);
  }
  throw new Error(`${JSON.stringify(item)} not a valid argument`);
}

const getInputAsUnicodeRanges = input => {
  input = Array.isArray(input) ? input : [input];
  return input.map(convertToUnicodeRange)
    .reduce((arr, ranges) => {
      return arr.concat(ranges);
    }, []);
}

export const setDefaultAvailableRanges = ranges => {
  defaultAvailableRanges = new UnicodeRangeSet(getInputAsUnicodeRanges(ranges));
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
    this._availableRanges = new UnicodeRangeSet(getInputAsUnicodeRanges(ranges));
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
