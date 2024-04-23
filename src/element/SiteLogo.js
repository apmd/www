import { createElement } from "../createElement.js";
import { base, isBase } from "../base.js";
import { subscribe } from "../util/message/subscribe.js";
import { toStyleSheet } from "../util/styleSheet.js";
import css from "./SiteLogo.css";

export default class SiteLogo extends HTMLElement {
  constructor() {
    super();
  }
  async connectedCallback() {
    if (isBase) return;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.adoptedStyleSheets = toStyleSheet(css);

    subscribe((config) => {
      if (!config) return;
      const { logo, title, subtitle } = config;
      this.shadowRoot.replaceChildren(createElement('a', {
        href: base,
        part: 'a',
      }, [
        logo && createElement('img', {
          src: logo.src,
          width: logo.width,
          height: logo.height,
          alt: logo.alt ?? '',
          part: 'img',
        }),
        createElement('h1', {
          part: 'title',
        }, [
          document.createTextNode(`${title || '←'} `),
          subtitle && createElement('i', {
            textContent: subtitle,
            part: 'subtitle',
          })
        ]),
      ]));
    }, [
      'config'
    ]);
  }
}