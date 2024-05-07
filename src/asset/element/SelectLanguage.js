import { createElement } from "../createElement";
import { langHrefs } from "../langHref";

const { lang } = document.documentElement;

export default class SelectLanguage extends HTMLElement {
  langHrefs = langHrefs();
  constructor() {
    super();
  }
  async connectedCallback() {
    if (!this.langHrefs) return;

    const shadow = this.attachShadow({ mode: 'open' });
    
    const select = createElement('select', {
      autocomplete: 'off',
      part: 'select',
      onchange: ({ target }) => {
        location.href = target.value;
      },
    }, this.langHrefs.reduce((options, [lang, href]) => {
      options.push(createElement('option', {
        textContent: lang.toUpperCase(),
        value: href ?? langHref(lang),
      }));
      return options;
    }, [
      createElement('option', {
        selected: true,
        textContent: lang.toUpperCase()
      })
    ]))
  
    window.addEventListener("pageshow", () => {
      if (select) select.selectedIndex = 0;
    });

    shadow.append(select);
  }
}
