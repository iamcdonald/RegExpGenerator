import models from '../models';

export default (regexModel, parent) => {
  return new models[`${regexModel.constructor.name}Generator`](regexModel, parent);
}
