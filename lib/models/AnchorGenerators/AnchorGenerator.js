import NotSupportedError from '../error/NotSupportedError';

export default class AnchorGenerator {

  constructor(model) {
    throw new NotSupportedError(model.constructor.name, model.text);
  }

}
