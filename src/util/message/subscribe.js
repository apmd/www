export function subscribe(callback, keys) {
  const detail = {
    callback,
    keys,
  };
  window.dispatchEvent(new CustomEvent('subscribe', { detail }));
  return () => {
    window.dispatchEvent(new CustomEvent('unsubscribe', { detail }));
  }
}