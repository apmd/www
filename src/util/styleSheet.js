/**
 * @param {string[]} texts
 * @returns {CSSStyleSheet}
 */
export function toStyleSheet(...texts) {
  const styles = [];
  for (const text of texts) {
    const style = new CSSStyleSheet();
    style.replaceSync(text);
    styles.push(style)
  }
  return styles;
}
