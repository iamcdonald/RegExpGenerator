import Generator from '../base/Generator';

export default class BackSpaceGenerator extends Generator {

  constructor() {
    super(...arguments);
  }

  _generate() {
    return '\u0008';
  }
}
