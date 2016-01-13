import LiteralGenerator from '../models/LiteralGenerator';
import StartGenerator from '../models/StartGenerator';
import EndGenerator from '../models/EndGenerator';
import CharacterClassGenerator from '../models/CharacterClassGenerator';
import GroupGenerator from '../models/GroupGenerator';

const regexToGenerator = {
  'Literal'       : (literal, parent) => new LiteralGenerator(literal, parent),
  'Start'         : (start, parent) => new StartGenerator(start, parent),
  'End'           : (end, parent) => new EndGenerator(end, parent),
  'CharacterClass': (characterClass, parent) => new CharacterClassGenerator(characterClass, parent),
  'Group'         : (group, parent) => new GroupGenerator(group, parent)
}

export default (regexModel, parent) => {
  return regexToGenerator[regexModel.constructor.name](regexModel, parent);
}
