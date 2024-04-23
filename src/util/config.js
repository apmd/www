import { publish } from "./message/publish";

export function fetchConfig() {
  fetch('/config.json', {
    cache: 'force-cache'
  }).then(async (response) =>
    publish('config', await response.json())
  ).catch(() =>
    ({})
  )
}