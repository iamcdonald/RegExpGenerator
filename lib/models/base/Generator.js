import { int as randomInt } from '../../utils/random';
import QuantifierGenerator, { defaultQuantifierMax } from './QuantifierGenerator';
import RandomCharacterGenerator from '../../utils/RandomCharacterGenerator'

export default class Generator {

  _parsedModel;
  _parent = null;
  _genValue = '';
  content;
  quantifier;

  constructor(parsedModel, parent) {
    this._parent = parent;
    if (!this._parent) {
      this._randomCharacterGenerator = new RandomCharacterGenerator();
      this._groupContent = {};
    }
    this._parsedModel = parsedModel;
    this.content = this._parsedModel.content;
    this.quantifier = new QuantifierGenerator(this._parsedModel.quantifier, this);
  }

  generate() {
    return Array.apply(null, new Array(this.quantifier.generate()))
          .map(() => this._generate())
          .join('');
  }

  _generate() {
    throw new Error('should be overridden in descendant classes');
  }

  get randomCharacterGenerator() {
    if (this._parent) {
      return this._parent.randomCharacterGenerator
    }
    return this._randomCharacterGenerator;
  }

  get quantifierMax() {
    if (this._parent) {
      return this._parent.quantifierMax
    }
    return this._quantifierMax || defaultQuantifierMax;
  }

  set quantifierMax(qm) {
    if (this._parent) {
      this._parent.quantifierMax = qm
    }
    this._quantifierMax = qm
  }

  _setGeneratedContentForGroup(content, groupId) {
    if (this._parent) {
      this._parent._setGeneratedContentForGroup(...arguments);
      return;
    }
    this._groupContent[groupId] = content;
  }

  _getGeneratedContentForGroup(groupId) {
    if (this._parent) {
      return this._parent._getGeneratedContentForGroup(groupId);
    }
    return this._groupContent[groupId];
  }

}
