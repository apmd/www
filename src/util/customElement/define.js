import { subscribe } from "../message/subscribe";
import { observe } from "./observe";

/**
 * @typedef {{ default: CustomElementConstructor}} Module
 * @typedef {function(): Promise<Module>} Loader
 * */

/** @type { Map<string, Loader | Promise<Module>>} } */
const importElements = new Map();

async function load(name) {
  const loader = importElements.get(name);
  if (!loader || loader instanceof Promise) return;
  importElements.set(name, loader()
    .then((module) => customElements.define(name, module.default))
    .finally(() => importElements.delete(name)))
}

const observer = new MutationObserver(async (records) => {
  for (const { addedNodes } of records) {
    for (const { tagName } of addedNodes) {
      load(tagName);
    }
  }
});

let subscription;

/**
 * @param {Object.<string, Loader | CustomElementConstructor>} entries
 */
export function defineElements(entries) {
  for (const name in entries) {
    // const constructor = customElements.get(tagName);
    // if (constructor) {
    //   await loader();
    // }
    const element = entries[name];
    if (element.prototype instanceof Element)
      customElements.define(name, element)
    else
      importElements.set(name, element);
  }
  subscription ||= subscribe((target) => {
    if (!target) return;
    for (const [name] of importElements) {
      if (target.querySelector(name)) load(name);
    }
    observer.observe(target, { childList: true, subtree: true });
  }, [
    'observe'
  ]);
  observe(document);
}

// /**
//  * @param {Document | ShadowRoot} target
//  */
// export function observe(target) {
//   for (const [name] of importElements) {
//     if (target.querySelector(name)) load(name);
//   }
//   observer.observe(target, { childList: true, subtree: true });
// }

