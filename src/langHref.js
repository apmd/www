import { dir } from "./base.js";
import { indexFile, isFile } from "./uri.js";

export function langHref(lang) {
  // let {
  //   protocol: href
  // } = location;
  // href += '//' + hostname
  // if (port) href += ':' + port;
  let href = dir + lang + '/' + indexFile;
  // console.log({ dir, path, lang, href })
  // if (isFile) href += indexFile;
  return href;
}

// use implies rerender

export function langHrefs() {
  // const langHrefs = {};
  const links = document.querySelectorAll('link[hreflang]');
  if (!links.length) return;
  return Array.from(links, ({ href, hreflang }) => [hreflang, href]);
  // return langHrefs;
} 