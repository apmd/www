import { createElement } from "../createElement";

/**
 * @param {Object.<string, string>[]} navigation
 * @returns {DocumentFragment}
 */
export function createNavigation(navigation) {
  const fragment = document.createDocumentFragment();
  for (const list of navigation) {
    const ul = createElement('ul');
    for (const path in list) {
      ul.appendChild(createElement('li', {}, [
        createElement('a', {
          textContent: list[path],
          href: path,
        })
      ]));
    }
    fragment.appendChild(ul);
  }
  return fragment;
}