import Generator from '../base/Generator';

export default class AnyCharGenerator extends Generator {

  constructor() {
    super(...arguments);
  }

  _generate() {
    return this.randomCharacterGenerator.getCharacter();
  }
}
