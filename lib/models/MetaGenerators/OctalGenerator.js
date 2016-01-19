import Generator from '../base/Generator';

export default class HexGenerator extends Generator {

  constructor() {
    super(...arguments);
  }

  toCodePoint() {
    return parseInt(this.content, 8);
  }

  _generate() {
    return String.fromCodePoint(this.toCodePoint());
  }
}
