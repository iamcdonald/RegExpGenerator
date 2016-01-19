import Generator from '../base/Generator';

const baseline = 'A'.codePointAt(0);

export default class ControlGenerator extends Generator {

  constructor() {
    super(...arguments);
  }

  toCodePoint() {
    return this.content.toUpperCase.codePointAt(0) - baseline + 1;
  }

  _generate() {
    return String.fromCodePoint(this.toCodePoint());
  }
}
