export function fail(key) {
  const detail = {
    key,
  };
  window.dispatchEvent(new CustomEvent('fail', { detail }));
}