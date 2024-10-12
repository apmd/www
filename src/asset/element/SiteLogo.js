import { createElement } from "../createElement.js";
// import { base, dir } from "../base.js";
import { subscribe } from "../util/message/subscribe.js";
// import { toStyleSheet } from "../util/styleSheet.js";
import { createFavicon } from "../util/createFavicon.js";
import css from "./SiteLogo.css" assert { type: "css" };
import { versionParam } from "../util/versionParam.js";

function createLogo(logo = {}, version, base) {
  const {
    src = versionParam(new URL('../asset/img/logo.svg', base), version),
    width,
    height,
    alt = '←'
  } = logo;
  return createElement('img', {
    onload: () => createFavicon(src),
    part: 'img',
    src,
    width,
    height,
    alt,
  });
}

export default class SiteLogo extends HTMLElement {
  constructor() {
    super();
  }
  async connectedCallback() {
    // if (isBase) return;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.adoptedStyleSheets = [css];

    subscribe((config) => {
      if (!config) return;
      const { baseURI } = document;
      const { logo, title, subtitle, version } = config;
      this.shadowRoot.replaceChildren(createElement('a', {
        href: baseURI,
        part: 'a',
      }, [
        createLogo(logo, version, baseURI),
        title && createElement('h1', {
          part: 'title',
        }, [
          document.createTextNode(title),
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