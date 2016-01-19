import Generator from '../base/Generator';

export default class TabGenerator extends Generator {

  constructor() {
    super(...arguments);
  }

  _generate() {
    return '\u0009';
  }
}
