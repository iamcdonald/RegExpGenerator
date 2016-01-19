import Generator from './base/Generator';
import wrap from '../utils/wrap';

const isLookaheadGroup = group => !!group._parsedModel.positiveLookahead || group._parsedModel.negativeLookahead;

export default class GroupGenerator extends Generator {

  constructor() {
    super(...arguments);
    if (isLookaheadGroup(this)) {
      throw new Error('Positive \'(?=)\' and negative \'(?!)\' lookahead groups are not supported');
    }
    this.content = this.content.map(model => wrap(model, this));
  }

  _generate() {
    return this.content.map(c => c.gen()).join('');
  }
}
