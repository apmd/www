const { href, pathname, protocol } = location;
const lang = `/${document.documentElement.lang}/`;

export const isFile = protocol === 'file:';


export const baseURI = isFile && href.substring(0, href.indexOf(lang) + lang.length);

const _ = '';
const indexName = isFile ? 'index' : _;
const type = '.html';
export const indexFile = isFile ? indexName + type : _;

export const relative = (path, file) => {
  return `${path || isFile ? './' : '/'}${file || indexFile}`;
}