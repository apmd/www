export function publish(key, value) {
  const detail = {
    key,
    value
  };
  window.dispatchEvent(new CustomEvent('publish', { detail }));
}