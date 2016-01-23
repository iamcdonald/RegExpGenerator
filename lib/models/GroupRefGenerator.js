import Generator from './base/Generator';
import wrap from '../utils/wrap';

export default class GroupRefGenerator extends Generator {

  _generate() {
    return this._getGeneratedContentForGroup(this.content);
  }
}
