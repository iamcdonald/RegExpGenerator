export default class NotSupportedError extends Error {

  name = 'NotSupportedError';

  constructor(modelName, type) {
    super();
    modelName = modelName.match(/[A-Z][a-z]*/g).map((w, idx) => idx ? w.toLowerCase() : w).join(' ');
    this.name = 'NotSupportedError';
    this.message = `${modelName} '${type}' not supported`;
  }
}
