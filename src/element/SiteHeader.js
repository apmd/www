import { createElement } from "../createElement.js";
import { isBase } from "../base.js";
import { subscribe } from "../util/message/subscribe.js";
import { toStyleSheet } from "../util/styleSheet.js";
import { observe } from "../util/customElement/observe.js";
import css from "./SiteHeader.css";
import { createNavigation } from "../util/createNavigation.js";

export default class SiteHeader extends HTMLElement {
  // template = document.createElement('template');
  loaded = false;
  constructor() {
    super();
  }
  async connectedCallback() {
    // const template = this.template.content.cloneNode(true);
    const shadow = this.attachShadow({ mode: 'open' });

    // const style = createElement('style', {
    //   // rel: 'stylesheet',
    //   // href: '/site-header.css'
    //   innerHTML: css,
    // });
    shadow.adoptedStyleSheets = toStyleSheet(css);

    const logoElement = !isBase && createElement('site-logo', {
      part: 'logo'
    });
    const slot = createElement('slot');
    const nav = createElement('nav', {
      part: 'nav',
    });

    const open = createElement('button', {
      className: 'menu open',
      textContent: '=',
      onclick: () => this.classList.add('open')
    });
    const close = createElement('button', {
      className: 'menu close',
      textContent: '×',
      onclick: () => this.classList.remove('open')
    });

    const select = createElement('select-language');

    const header = createElement('header', {
      role: 'banner'
    }, [
      // style,
      logoElement,
      slot,
      nav,
      select,
      open,
      close,
    ]);

    shadow.append(header);
    observe(shadow);
    
    subscribe((config) => {
      if (!config) return;
      const { navigation } = config;
      nav.appendChild(createNavigation(navigation.header));
    }, [
      'config'
    ]);

    // const a = !isBase && createElement('a', {
    //   href: base,
    //   className: 'logo',
    //   part: 'logo',
    // }, [
    //   logo && createElement('img', {
    //     src: logo.src,
    //     width: 100,
    //     alt: logo.alt ?? '',
    //   }),
    //   createElement('h1', {}, [
    //     document.createTextNode(`${title || '←'} `),
    //     subtitle && createElement('i', {
    //       textContent: subtitle,
    //     })
    //   ]),
    // ]);
  
    // const a = !isBase && createElement(customElements.getName(SiteLogo));

    
    // const select = this.langHrefs && createElement('select', {
    //   autocomplete: 'off',
    //   onchange: ({ target }) => {
    //     location.href = target.value;
    //   },
    // }, this.langHrefs.reduce((options, [lang, href]) => {
    //   options.push(createElement('option', {
    //     textContent: lang.toUpperCase(),
    //     value: href ?? langHref(lang),
    //   }));
    //   return options;
    // }, [
    //   createElement('option', {
    //     selected: true,
    //     textContent: lang.toUpperCase()
    //   })
    // ]));

    // this.dispatchEvent(new Event('load'));
  }
}

