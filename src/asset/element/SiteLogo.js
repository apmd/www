import { createElement } from "../createElement.js";
import { base, dir } from "../base.js";
import { subscribe } from "../util/message/subscribe.js";
import { toStyleSheet } from "../util/styleSheet.js";
import { createFavicon } from "../util/createFavicon.js";
import css from "./SiteLogo.css";
import { versionParam } from "../util/versionParam.js";

function createLogo(logo = {}, version) {
  const {
    src = versionParam(dir + 'asset/img/logo.svg', version),
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
    this.shadowRoot.adoptedStyleSheets = toStyleSheet(css);

    subscribe((config) => {
      if (!config) return;
      const { logo, title, subtitle, version } = config;
      this.shadowRoot.replaceChildren(createElement('a', {
        href: base,
        part: 'a',
      }, [
        createLogo(logo, version),
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