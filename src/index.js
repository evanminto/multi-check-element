import MultiCheckElement from './MultiCheckElement.js';

/**
 * @param {string} [name]
 * @returns {void}
 */
const define = (name = 'multi-check') => {
  if ('customElements' in window) {
    customElements.define(name, MultiCheckElement);
  }
};

export { MultiCheckElement, define };
