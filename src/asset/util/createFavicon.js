import { createElement } from "../createElement";

export function createFavicon (href) {
  if (!href) return;
  const icon = document.querySelector('link[rel=icon]');
  if (icon) icon.href = href;
  else document.head.appendChild(createElement('link', {
    rel: 'icon',
    href,
  }));
}