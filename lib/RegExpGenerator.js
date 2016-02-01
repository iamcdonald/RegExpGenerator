import RegExpParser from 'RegExpParser';
import Generator from './models/base/Generator';
import wrap from './utils/wrap';
export { setDefaultAvailableRanges } from './utils/RandomCharacterGenerator';
export { setDefaultQuantifierMax } from './models/base/QuantifierGenerator';

export default class RegExpGenerator extends Generator {

  quantifierMax;

  constructor(regex) {
    super(new RegExpParser(regex));
    this.content = this.content.map(model => wrap(model, this));
  }

  _generate() {
    return this.content.map(node => node.generate()).join('');
  }

  set availableRanges(ranges) {
    this.randomCharacterGenerator.setAvailableRanges(ranges);
  }

  get availableRanges() {
    return this.randomCharacterGenerator.availableRanges;
  }

}
