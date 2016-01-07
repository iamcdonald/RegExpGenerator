export default class UnicodeRange {

  start;
  end;
  weighting = { start: 0, end: 0 };

  constructor(start, end) {
    this.start = typeof start === 'string' ? start.codePointAt(0) : start;
    this.end = typeof end === 'string' ? end .codePointAt(0) : end;
  }

  clone() {
    let cln = new UnicodeRange(this.start, this.end),
      { start, end } = this.weighting;
    return cln;
  }
}
