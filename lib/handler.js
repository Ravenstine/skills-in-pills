/* eslint no-console:0 */

const remember = require('./remember');
const persist = require('./persist');
const dealer = require('./dealer');


module.exports = pills => (request, ctx, callback) => {
  // we default to the entrypoint pill if no pill is specified in the request
  remember(request)
    .then(() => dealer(request, pills))
    .then(context =>
      // Post processing
      persist(context)
        .then(() => callback(null, context.response)))
    .catch((err) => {
      // something went very wrong
      console.error(err ? err.stack : err);
      const dialog = err.speak || label['error dialog'] || 'Looks like I overdosed!';
      speak(dialog, context);
      context.navigator.goTo(null); // abort!
      context.navigator.reload(); // act like nothin's happened
      callback(err);
    });
};
