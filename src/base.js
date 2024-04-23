import { isFile, indexFile } from "./uri";

const { href, pathname, protocol } = location;
const { documentElement } = document;

// const isFile = protocol === 'file:';

// file:///Users/mojo/Src/apmd/www/en/index.html
// http://apmd/    th/test
// http://apmd/asd/sdf/en/
// const lang = 
const regExp = new RegExp(`^(\/.+\/)(${documentElement.lang}\/)(.*)$`);
const [_, dir = '/', lang = '', path] = pathname.match(regExp) || [];
// const match = pathname.match(new RegExp(`(.*\/${documentElement.lang}\/)?(.*)$`)) || [];
// export const [string, base, path] = match;
const base = isFile
  ? dir + lang + indexFile
  : '/';
const isBase = isFile && path === indexFile;
// console.log({ isFile, base, dir, lang, path })
export {
  base,
  dir,
  isBase,
  lang,
  path
};