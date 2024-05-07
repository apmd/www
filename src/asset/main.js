import SelectLanguage from './element/SelectLanguage.js';
import SiteHeader from './element/SiteHeader.js';
import SiteFooter from './element/SiteFooter.js';
import SiteLogo from './element/SiteLogo.js';
import { addMessageListeners } from './util/message/listen.js';
import { fetchConfig } from './util/config.js';
import { defineElements } from './util/customElement/define.js';
import { createBase } from './util/createBase.js';
// import './main.css';

// if (baseURI) {
//   document.head.appendChild(Object.assign(document.createElement('base'), {
//     href: baseURI,
//   }))
// }

// const CustomElement = {
//   SiteFooter: 'site-footer',
//   SiteHeader: 'site-header',
//   SiteLogo: 'site-logo',
// };

// const customElements = define([
//   [SiteLogo, 'site-logo']
// ]);


// console.log(map.get(SiteLogo))
// // customElements

// define({
//   'site-logo': SiteLogo
// })
// createFavicon();
// createBase();
addMessageListeners();
fetchConfig();
defineElements({
  'site-logo': SiteLogo,
  'select-language': SelectLanguage,
  'site-header': SiteHeader,
  'site-footer': SiteFooter,
  'content-list': () => import('./element/ContentList.js'),
});

// customElements.define('site-logo', SiteLogo);
// document.getElementsByTagName('site-logo');
// import('./element/SiteLogo.js').then(() => {
//   customElements.define('site-logo', SiteLogo);
// })
// customElements.define('select-language', SelectLanguage);
// customElements.define('site-header', SiteHeader);
// customElements.define('site-footer', SiteFooter);



// const visible = 'opacity-100';

// for (const siteHeader of document.getElementsByTagName(customElements.getName(SiteHeader))) {
//   siteHeader.addEventListener('load', ({ target }) => {
//     target.classList.add(visible)
//   })
// }

// for (const img of document.getElementsByTagName('img')) {
//   setTimeout(() => {
//     if (!img.complete) img.classList.add('opacity-0');
//     else return;
//     // if (img.complete) return img.classList.add(visible);
//     img.addEventListener('load', ({ target }) => {
//       target.classList.remove('opacity-0');
//     });
//   }, 300);
// }
