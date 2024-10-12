import { isBase, dir } from '../base.js';
import { createElement } from '../createElement.js';

export function createBase() {
  // if (!isBase) return;
  console.log({ dir })
  document.head.appendChild(createElement('base', {
    href: dir,
  }));
}