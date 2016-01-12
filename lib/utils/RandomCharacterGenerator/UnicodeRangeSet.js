import UnicodeRange from './UnicodeRange';
import { int as randomInt, float as randomFloat } from '../random';

const sortAscending = (a, b) => a.start - b.start;

const mergeRanges = (ranges, incoming = []) => {
  return ranges
    .concat(incoming)
    .sort(sortAscending)
    .reduce((merged, range) => {
      if (!merged.length) {
        return [].concat(range);
      }
      let prevRange = merged[merged.length - 1];
      if (range.start <= prevRange.end + 1) {
        prevRange.end = Math.max(prevRange.end, range.end);
      } else {
        merged.push(range);
      }
      return merged
    }, []);
}

const subtractRanges = (ranges, exclusions = []) => {
  return ranges.reduce((nr, range) => {
      return nr.concat(exclusions.reduce((rm, e) => {
          return rm.reduce((rs, r) => {
              return rs.concat(r.subtract(e));
            }, []);
        }, [range]))
    }, []);
}

export default class UnicodeRangeSet {

  ranges;
  totalChars;

  constructor(ranges = []) {
    this.ranges = mergeRanges(ranges.map(r => r.clone()));
    this.totalChars = this.ranges.reduce((total, range) => total + (range.end - range.start + 1), 0);
  }

  merge(newRanges = []) {
    return new UnicodeRangeSet(mergeRanges(
          this.ranges.map(r => r.clone()),
          newRanges.map(r => r.clone())
        )
      );
  }

  subtract(exclusions = []) {
    return new UnicodeRangeSet(subtractRanges(
          this.ranges.map(r => { return r.clone()}),
          exclusions.map(r => { return r.clone()})
        )
      );
  }

  getRandomCharacter() {
    let int = randomInt(1, this.totalChars);
    return this.ranges.reduce((char, range) => {
        if (typeof char === 'string') {
          return char;
        }
        char = char - (range.end - range.start + 1);
        if (char <= 0) {
          return String.fromCodePoint(range.end + char);
        }
        return char;
      }, int);
  }

}
