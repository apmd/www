import { createElement } from "../createElement.js";
import { toStyleSheet } from "../util/styleSheet.js";
import a from "../style/a.css";
import css from "./ContentList.css";

export default class ContentList extends HTMLElement {
  constructor() {
    super();
  }
  async connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    this.shadowRoot.adoptedStyleSheets = toStyleSheet(a, css);

    const headings = document.querySelectorAll('h2, h3, h4');
    const ol = createElement('ol', {
      role: 'doc-toc',
    })
    const summary =  createElement('summary', {
      part: 'summary',
    }, [
      createElement('slot')
    ])
    const details = createElement('details', {
      part: 'details',
    }, [
      summary,
      ol,
    ]);

    let list = ol;
    let level;
    for (const heading of headings) {
      const {
        id,
        parentElement,
        tagName,
        innerHTML
      } = heading;
      if (parentElement === shadow.host) continue;
      const li = createElement('li', {}, [
        createElement('a', id ? {
            href: '#' + id,
            innerHTML,
          } : {
            role: 'button',
            onclick: () => heading.scrollIntoView(),
            innerHTML,
          })
      ]);
      if (!level || tagName === level) {
        list.appendChild(li);
      }
      if (tagName < level) {
        list = list.parentElement.parentElement;
        list.appendChild(li)
      }
      if (tagName > level) {
        list = list.lastChild.appendChild(createElement('ol', {}, [li]));
      }
      level = tagName;
    }
  
    shadow.appendChild(details);
  }
}