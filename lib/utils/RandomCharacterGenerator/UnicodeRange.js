const numberAsUnicodeString = num => {
  num = num.toString(16);
  while(num.length < 4) {
    num = `0${num}`;
  }
  return `U+${num}`;
}

export default class UnicodeRange {

  start;
  end;

  constructor(start, end) {
    if (start > end) {
      throw new Error('start value must be smaller or equal to end value');
    }
    this.start = typeof start === 'string' ? start.codePointAt(0) : start;
    this.end = typeof end === 'string' ? end .codePointAt(0) : end;
  }

  clone() {
    let cln = new UnicodeRange(this.start, this.end);
    return cln;
  }

  intersect(range) {
    try {
      return new UnicodeRange(Math.max(this.start, range.start), Math.min(this.end, range.end));
    } catch (e) {
      throw new Error(`no valid intersection between ${this.toString()} and ${range.toString()}`)
    }
  }

  subtract(range) {
    let ranges = [];
    if (range.start > this.end || range.end < this.start) {
      return [this];
    }
    if (range.start > this.start) {
      ranges.push(new UnicodeRange(this.start, range.start - 1));
    }
    if (range.end >= this.start) {
      if (range.end < this.end) {
        ranges.push(new UnicodeRange(range.end + 1, this.end));
      }
    }
    return ranges;
  }

  merge(range) {
    let ranges = [];
    if (range.start > this.end + 1 || range.end < this.start - 1) {
      return [this, range];
    }
    return [new UnicodeRange(Math.min(range.start, this.start), Math.max(range.end, this.end))];
  }

  toString() {
    return `${String.fromCodePoint(this.start)}(${numberAsUnicodeString(this.start)}) - ${String.fromCodePoint(this.end)}(${numberAsUnicodeString(this.end)})`;
  }
}
