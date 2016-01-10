import { int as randomInt } from '../../utils/random';
import QuantifierGenerator from './QuantifierGenerator';

export default class Generator {

  _parsedModel;
  _randomCharacterGenerator = null;
  _parent = null;
  content;
  quantifier;

  constructor(parsedModel, parent) {
    this._parent = parent;
    this._parsedModel = parsedModel;
    this.content = this._parsedModel.content;
    this.quantifier = new QuantifierGenerator(this._parsedModel.quantifier, this);
    delete this._parsedModel.quantifier;
    delete this._parsedModel.content;
  }

  gen() {
    return Array.apply(null, new Array(this.quantifier.get()))
          .map(() => this._generate())
          .join('');
  }

  _generate() {
    throw new Error('should be overridden in descendant classes');
  }

  get randomCharacterGenerator() {
    return this._randomCharacterGenerator || this._parent.randomCharacterGenerator;
  }

  set randomCharacterGenerator(rcg) {
    this._randomCharacterGenerator = rcg;
  }

  get quantifierMax() {
    return this._quantifierMax || this._parent ? this._parent.quantifierMax : null;
  }

  set quantifierMax(qm) {
    this._quantifierMax = qm;
  }

}
