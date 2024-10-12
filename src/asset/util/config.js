import { publish } from "./message/publish.js";
import { versionParam } from "./versionParam.js";

const version = 'dev'; // process && process.env && process.env.npm_package_version || 'dev';
export function fetchConfig() {
  console.log('cnonfig', document.baseURI);
  fetch(versionParam(new URL('config.json', document.baseURI), version), {
    cache: 'force-cache'
  }).then(async (response) =>
    publish('config', {
      ...await response.json(),
      version,
    })
  ).catch(() => 
    publish('config', {
      version
    })
  )
}