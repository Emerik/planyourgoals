/*
* This file used to avoid mocha error on module built by webpack and import in js
*/

function noop() {
  return null;
}
require.extensions['.css'] = noop;
require.extensions['.styl'] = noop;
require.extensions['.scss'] = noop;
