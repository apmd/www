import { publish } from "./message/publish";
import { versionParam } from "./versionParam";

function fail() {

}

const version = process.env.npm_package_version;
export function fetchConfig() {
  fetch(versionParam('/config.json', version), {
    cache: 'force-cache'
  }).then(async (response) =>
    publish('config', {
      ...await response.json(),
      version
    })
  ).catch(() => 
    publish('config', {
      version
    })
  )
}