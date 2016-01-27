import RegExpGenerator from '../RegExpGenerator';

export default regex => {
  const { content: [ characterClass ] } = new RegExpGenerator(regex);
  if (characterClass.constructor.name !== 'CharacterClassGenerator') {
    throw new TypeError('regex should contain only character class');
  }
  return characterClass.toUnicodeRange();
}
