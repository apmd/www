import { createElement } from "../createElement.js";
import { createNavigation } from "../util/createNavigation.js";
import { subscribe } from "../util/message/subscribe.js";
import { toStyleSheet } from "../util/styleSheet.js";
import css from "./SiteFooter.css";
import a from "./a.css";

const year = new Date().getFullYear();

export default class SiteFooter extends HTMLElement {
  constructor() {
    super();
  }
  async connectedCallback() {
  
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.adoptedStyleSheets = toStyleSheet(a, css);

    const siteLogo = createElement('site-logo', {
      part: 'logo',
    });
    const p = createElement('p');
    const slot = createElement('slot', {
      part: 'slot'
    });
    const licenseText = createElement('small', {
      part: 'license',
      textContent: year,
    });

    const aside = createElement('aside', {
      part: 'aside',
    }, [
      siteLogo,
      p,
      slot,
      licenseText,
    ]);
    const nav = createElement('nav', {
      part: 'nav'
    });
  
    const footer = createElement('footer', {
      part: 'footer',
      role: 'contentinfo'
    }, [
      aside,
      nav,
    ]);

    this.shadowRoot.append(footer);
  
    subscribe((config) => {
      if (!config) return;

      const { license, navigation, footer } = config;
      if (license) licenseText.replaceChildren(
        document.createTextNode(year),
        createElement('a', {
          rel: 'license',
          href: license.href,
          target: '_blank',
          textContent: license.name,
        })
      );

      if (footer) p.innerHTML = footer.replace('\n', '<br>');

      if (navigation) nav.append(
        createNavigation(navigation.header),
        createNavigation(navigation.footer)
      );
    }, [
      'config'
    ]);
  }
};