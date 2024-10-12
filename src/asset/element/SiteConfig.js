import { fetchConfig } from "../util/config.js";

export default class SiteConfig extends HTMLElement {
  static observedAttributes = ['href'];
  constructor() {
    super();
  }
  // connectedCallback() {
  //   this.attachShadow({ mode: 'open' });
  // }
  attributeChangedCallback(name, lastValue, value) {
    switch (name) {
      case 'href': {
        console.log('site-config', value)
        if (!value || value === lastValue) return;
        fetchConfig(value);
      }
    }
  }
}