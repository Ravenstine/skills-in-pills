/* eslint new-cap:0, no-console:0 */

const CoffeeScript = require('coffeescript');
const vm = require('vm');
const _ = require('lodash');

module.exports = (coffeeSource, context, scope) => {
  if (!coffeeSource) { return; }
  const src = CoffeeScript.compile(coffeeSource, { bare: true });
  const script = new vm.Script(src);

  const ctx = { _ };

  Object.assign(ctx, context);
  Object.assign(ctx, context.webResponse || {});
  Object.assign(ctx, context.attributes);
  Object.assign(ctx, context.temp);
  Object.assign(ctx, context.slots);

  if (scope) {
    Object.assign(ctx, scope);
  }

  const vmContext = new vm.createContext(ctx);

  try {
    return script.runInNewContext(vmContext);
  } catch (err) {
    console.warn(err);
  }
};
