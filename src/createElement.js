/**
 * @template {keyof HTMLElementTagNameMap} TagName
 * @template {HTMLElementTagNameMap[tagName]} Constructor
 * @param {TagName} tagName
 * @param {Constructor} attributes
 * @param {[string | Node][]} nodes
 * @returns {Constructor}
 */
export function createElement (
  tagName,
  attributes,
  nodes
) {
  const element = document.createElement(tagName);

  if (nodes) element.append(...nodes);
  
  return attributes
    ? Object.assign(element, attributes)
    : element;
}
