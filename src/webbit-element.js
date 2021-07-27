import { LitElement } from 'lit';
import ResizeObserver from 'resize-observer-polyfill';

const getDefaultValue = type => {
  const defaultValues = {
    'String': '',
    'Number': 0,
    'Boolean': false,
    'Array': [],
    'Object': {}
  };
  return defaultValues[typeof type === 'function' ? type.name : type] ?? '';
}

export default class WebbitElement extends LitElement {

  constructor() {
    super();

    for (let name in this.constructor.properties) {
      const {
        defaultValue,
        type,
        get: getter,
        set: setter,
      } = this.constructor.properties[name];

      if (typeof getter === 'function' || typeof setter === 'function') {
        Object.defineProperty(this, name, {
          get() {
            if (typeof getter === 'function') {
              return getter.bind(this)(this[`#${name}`]);
            }
            return this[`#${name}`];
          },
          set(value) {
            const oldValue = this[`#${name}`];
            this[`#${name}`] = typeof setter === 'function'
              ? setter.bind(this)(value)
              : value;
            this.requestUpdate(name, oldValue);
          }
        });
      }

      this[name] = typeof defaultValue !== 'undefined' ? defaultValue : getDefaultValue(type);
    }

    const resizeObserver = new ResizeObserver(() => {
      this.resized();
    });
    resizeObserver.observe(this);

  }

  resized() { }
}
