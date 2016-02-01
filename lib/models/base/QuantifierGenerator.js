import { int as randomInt } from '../../utils/random';

export let defaultQuantifierMax = 10;

export const setDefaultQuantifierMax = max => {
  defaultQuantifierMax = max;
}

export default class QuantifierGenerator {

  _quantifier
  _parent;

  constructor(quantifier, parent) {
    this._quantifier = quantifier;
    this._parent = parent;
  }

  generate() {
    if (!this._quantifier) {
      return 1;
    }
    let { min, max, lazy } = this._quantifier;
    max = max !== null ? max : (this.quantifierMax || defaultQuantifierMax);
    return lazy ? min : randomInt(min, max);
  }

  get quantifierMax() {
    return this._parent.quantifierMax;
  }

}
