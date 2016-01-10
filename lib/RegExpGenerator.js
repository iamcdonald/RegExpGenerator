import RegExpParser from 'RegExpParser';
import Generator from './models/base/Generator';
import wrap from './utils/wrap';
import RandomCharacterGenerator from './utils/RandomCharacterGenerator/RandomCharacterGenerator'

export default class RegExpGenerator extends Generator {

  randomCharacterGenerator = new RandomCharacterGenerator();
  quantifierMax;

  constructor(regex) {
    super(new RegExpParser(regex));
    this.content = this.content.map(model => wrap(model, this));
  }

  _generate() {
    return this.content.map(node => node.gen()).join('');
  }

}