import invertGenerator from './invertGenerator';
import AnyCharGenerator from './AnyCharGenerator';
import WhiteSpaceGenerator from './WhiteSpaceGenerator';
import WordCharGenerator from './WordCharGenerator';
import DigitGenerator from './DigitGenerator';


export default {
  'AnyCharGenerator': AnyCharGenerator,
  'WhiteSpaceGenerator': WhiteSpaceGenerator,
  'NonWhiteSpaceGenerator': invertGenerator(WhiteSpaceGenerator),
  'WordCharGenerator': WordCharGenerator,
  'NonWordCharGenerator': invertGenerator(WordCharGenerator),
  'DigitGenerator': DigitGenerator,
  'NonDigitGenerator': invertGenerator(DigitGenerator)
};
