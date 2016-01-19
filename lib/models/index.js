import AnchorGenerators from './AnchorGenerators';
import MetaGenerators from './MetaGenerators';
import AlternativeGenerator from './AlternativeGenerator';
import AlternativeOptionGenerator from './AlternativeOptionGenerator';
import CharacterClassGenerator from './CharacterClassGenerator';
import GroupGenerator from './GroupGenerator';
import LiteralGenerator from './LiteralGenerator';
import RangeGenerator from './RangeGenerator';

const Generators = {
  'AlternativeGenerator': AlternativeGenerator,
  'AlternativeOptionGenerator': AlternativeOptionGenerator,
  'CharacterClassGenerator': CharacterClassGenerator,
  'GroupGenerator': GroupGenerator,
  'LiteralGenerator': LiteralGenerator,
  'RangeGenerator': RangeGenerator
};

export default Object.assign({}, Generators, AnchorGenerators, MetaGenerators);
