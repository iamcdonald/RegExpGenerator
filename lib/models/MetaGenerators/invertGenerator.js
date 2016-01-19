export default generator => {

  return class InvertGenerator extends generator {

    constructor() {
      super(...arguments);
    }

    _generate() {
      return this.randomCharacterGenerator.getCharacterWithExclusions(this.chars);
    }
  }
}
