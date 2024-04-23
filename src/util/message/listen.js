const subscriptions = new Map();
const values = new Map();

function dispatch(keys, callback) {
  callback(...keys.map(key => values.get(key)));
}

export function addMessageListeners() {
  window.addEventListener('subscribe', ({
    detail: { keys, callback }
  }) => {
    subscriptions.set(keys, callback);
    dispatch(keys, callback);
  });
  
  window.addEventListener('unsubscribe', ({
    detail: { keys }
  }) => {
    subscriptions.delete(keys);
  })
  
  window.addEventListener('publish', ({
    detail: { key, value }
  }) => {
    values.set(key, value);
    for (const [keys, callback] of subscriptions) {
      if (!keys.includes(key)) continue;
      dispatch(keys, callback);
    }
  });
  
}