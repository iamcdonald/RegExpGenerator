import AnchorGenerators from './AnchorGenerators';
import MetaGenerators from './MetaGenerators';
import AlternativeGenerator from './AlternativeGenerator';
import AlternativeOptionGenerator from './AlternativeOptionGenerator';
import CharacterClassGenerator from './CharacterClassGenerator';
import GroupGenerator from './GroupGenerator';
import GroupRefGenerator from './GroupRefGenerator';
import LiteralGenerator from './LiteralGenerator';
import RangeGenerator from './RangeGenerator';

const Generators = {
  'AlternativeGenerator': AlternativeGenerator,
  'AlternativeOptionGenerator': AlternativeOptionGenerator,
  'CharacterClassGenerator': CharacterClassGenerator,
  'GroupGenerator': GroupGenerator,
  'GroupRefGenerator': GroupRefGenerator,
  'LiteralGenerator': LiteralGenerator,
  'RangeGenerator': RangeGenerator
};

export default Object.assign({}, Generators, AnchorGenerators, MetaGenerators);
