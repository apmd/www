import { isBase, dir } from '../base';
import { createElement } from '../createElement';

export function createBase() {
  // if (!isBase) return;
  console.log({ dir })
  document.head.appendChild(createElement('base', {
    href: dir,
  }));
}