import Generator from './base/Generator';
import { int as randomInt } from '../utils/random';
import wrap from '../utils/wrap';

export default class AlternativeGenerator extends Generator {

  constructor() {
    super(...arguments);
    this.content = this.content.map(model => wrap(model, this));
  }

  _generate() {
    return this.content[randomInt(0, this.content.length -1)].gen();
  }
}
