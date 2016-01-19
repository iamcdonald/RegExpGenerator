import Generator from '../base/Generator';

export default class WordBoundaryGenerator extends Generator {

  constructor() {
    super(...arguments);
    throw new Error('Word boundary anchors \'\b\' are not supported');
  }

}
