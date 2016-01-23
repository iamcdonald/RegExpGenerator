import invertGenerator from './invertGenerator';
import AnyCharGenerator from './AnyCharGenerator';
import WhiteSpaceGenerator from './WhiteSpaceGenerator';
import WordCharGenerator from './WordCharGenerator';
import DigitGenerator from './DigitGenerator';
import HexGenerator from './HexGenerator';
import OctalGenerator from './OctalGenerator';
import ControlGenerator from './ControlGenerator';
import ReturnGenerator from './ReturnGenerator';
import TabGenerator from './TabGenerator';
import NewLineGenerator from './NewLineGenerator';
import BackSpaceGenerator from './BackSpaceGenerator';
import VerticalWhiteSpaceGenerator from './VerticalWhiteSpaceGenerator';

export default {
  'AnyCharGenerator': AnyCharGenerator,
  'WhiteSpaceGenerator': WhiteSpaceGenerator,
  'NonWhiteSpaceGenerator': invertGenerator(WhiteSpaceGenerator),
  'WordCharGenerator': WordCharGenerator,
  'NonWordCharGenerator': invertGenerator(WordCharGenerator),
  'DigitGenerator': DigitGenerator,
  'NonDigitGenerator': invertGenerator(DigitGenerator),
  'HexGenerator': HexGenerator,
  'OctalGenerator': OctalGenerator,
  'ControlGenerator': ControlGenerator,
  'ReturnGenerator': ReturnGenerator,
  'TabGenerator': TabGenerator,
  'NewLineGenerator': NewLineGenerator,
  'BackSpaceGenerator': BackSpaceGenerator,
  'VerticalWhiteSpaceGenerator': VerticalWhiteSpaceGenerator
};
