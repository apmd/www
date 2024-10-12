import { createElement } from "../createElement.js";

export function createFavicon (href) {
  if (!href) return;
  const icon = document.querySelector('link[rel=icon]');
  if (icon) icon.href = href;
  else {
    const link = createElement('link', {
      rel: 'icon',
      href,
    });
    link.dataset.view = true;
    document.head.appendChild(link);
  }
}