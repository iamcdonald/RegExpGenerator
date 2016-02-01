import Generator from './base/Generator';
import wrap from '../utils/wrap';

export default class AlternativeOptionGenerator extends Generator {

  constructor() {
    super(...arguments);
    this.content = this.content.map(model => wrap(model, this));
  }

  _generate() {
    return this.content.map(c => c.generate()).join('');
  }
}
