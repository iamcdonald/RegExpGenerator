import Generator from '../base/Generator';

export default class ReturnGenerator extends Generator {

  constructor() {
    super(...arguments);
  }

  _generate() {
    return '\u000D';
  }
}
