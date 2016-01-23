import Generator from './base/Generator';
import wrap from '../utils/wrap';
import NotSupportedError from './error/NotSupportedError';

const isLookaheadGroup = group => !!group._parsedModel.positiveLookahead || group._parsedModel.negativeLookahead;

export default class GroupGenerator extends Generator {

  constructor(model) {
    super(...arguments);
    if (isLookaheadGroup(this)) {
      throw new NotSupportedError(model.constructor.name, `${model.text.slice(0, 3)})`);
    }
    this.content = this.content.map(model => wrap(model, this));
  }

  _generate() {
    let str = this.content.map(c => c.gen()).join('');
    this._setGeneratedContentForGroup(str, this._parsedModel.groupId);
    return str;
  }
}
