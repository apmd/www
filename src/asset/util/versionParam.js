export function versionParam(href, version) {
  const url = new URL(href);
  url.searchParams.append('version', version);
  return url;
  // return href + '?version=' + version;
}