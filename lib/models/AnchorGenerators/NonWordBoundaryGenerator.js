import Generator from '../base/Generator';

export default class NonWordBoundaryGenerator extends Generator {

  constructor() {
    super(...arguments);
    throw new Error('Non word boundary anchors \'\B\' are not supported');
  }

}
