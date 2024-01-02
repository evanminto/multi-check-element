/**
 * @customElement multi-check
 * @attr controls Space-separated list of IDs for checkboxes controlled by the
 * child checkbox
 */
export default class MultiCheckElement extends HTMLElement {
  /** @type {string[]} */
  #controls = [];

  static observedAttributes = ['controls'];
  
  /**
   * @param {string} name 
   * @param {string | undefined} _oldValue 
   * @param {string | undefined} newValue 
   */
  attributeChangedCallback(name, _oldValue, newValue) {
    if (name === 'controls') {
      this.#controls = (newValue || '').split(/\s+/);
      this.#updateCheckbox();
    }
  }
  
  /** @returns {string[]} */
  get controls() {
    return this.#controls;
  }
  
  /** @param {string[]} value */
  set controls(value) {
    if (!(value instanceof Array)) {
      throw new TypeError('value must be an array');
    }

    this.#controls = value.map(v => v.toString());

    this.setAttribute(
      'aria-controls',
      this.#controls.join(' ')
    );
  }
  
  connectedCallback() {
    this.addEventListener('change', this);
    document.body.addEventListener('change', this);
  }
  
  disconnectedCallback() {
    this.removeEventListener('change', this);
    document.body.removeEventListener('change', this);
  }
  
  /**
   * @param {Event} event
   * @returns {void}
   */
  handleEvent(event) {
    if (
      event.type !== 'change' ||
      !(event.target instanceof HTMLInputElement) ||
      !event.target.matches('input[type="checkbox"]')
    ) {
      return;
    }

    if (this.contains(event.target)) {
      const checkboxes = /** @type {HTMLInputElement[]} */ (
        [...document.querySelectorAll(
          this.#controls.map(id => `#${id}`).join(', ')
        )].filter(el => el instanceof HTMLInputElement)
      );

      const childChecked = event.target.checked;
      checkboxes.forEach(el => el.checked = childChecked);
    } else if (this.#controls.includes(event.target.id)) {
      this.#updateCheckbox();
    }
  }
  
  /** @returns {void} */
  #updateCheckbox() {
    const controlled = /** @type {HTMLInputElement[]} */ (
      [...document.querySelectorAll(
        this.#controls.map(id => `#${id}`).join(', ')
      )].filter(el => el instanceof HTMLInputElement)
    );
    
    /** @type {HTMLInputElement | null} */
    const childCheckbox = this.querySelector('input[type="checkbox"]');

    if (childCheckbox) {
      childCheckbox.setAttribute('aria-controls', this.#controls.join(' '));
      const controlledCount = controlled.length;
      const checkedCount = controlled.filter(el => el.checked).length;
      
      if (checkedCount === controlledCount) {
        if (childCheckbox.indeterminate) {
          childCheckbox.checked = true;
        }
        childCheckbox.indeterminate = false;
      } else if (checkedCount === 0) {
        childCheckbox.checked = false;
        childCheckbox.indeterminate = false;
      } else if (childCheckbox.checked) {
        childCheckbox.indeterminate = true;
      }
    }
  }
}
