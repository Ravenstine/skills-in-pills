/* eslint no-param-reassign:0, prefer-destructuring:0 */

const utteranceExpander = require('intent-utterance-expander');
// const camelize = require('camelize');
const typeAliases = require('../built-in-slot-type-aliases');

module.exports = (utterance, utteranceConfig) => {
  let expander;

  utteranceConfig.types = utteranceConfig.types || {};
  utteranceConfig.slots = utteranceConfig.slots || {};

  // parse and replace each of our custom slot tokens

  expander = utterance.replace(/\$\{([A-z]+):([A-z|.]+)\}/g, (token) => {
    const parsedMatcher = token.match(/\$\{([A-z]+):([A-z|.]+)\}/);
    const slotName = parsedMatcher[1];
    const slotType = parsedMatcher[2];
    utteranceConfig.slots[slotName] = utteranceConfig.slots[slotName] || {};
    utteranceConfig.slots[slotName].type = utteranceConfig.slots[slotName].type || slotType;
    utteranceConfig.slots[slotName].values = utteranceConfig.slots[slotName].values || [];
    return `{${slotName}}`;
  });

  // we parse out and replace slot tokens that are typeless.
  // if they happen to match the name of an AMAZON built-in slot type,
  // we then assume it's of that type.  otherwise, we create a blank type.
  expander = expander.replace(/\$\{\s*([A-z]+)\s*\}/g, (token) => {
    const slotName = token.match(/\$\{\s*([A-z]+)\s*\}/)[1];
    const guessedType = typeAliases[slotName] || (utteranceConfig.slots[slotName] || { type: 'AMAZON.LITERAL' }).type;
    if (guessedType) {
      utteranceConfig.slots[slotName] = utteranceConfig.slots[slotName] || {};
      utteranceConfig.slots[slotName].type = utteranceConfig.slots[slotName].type || guessedType;
      utteranceConfig.slots[slotName].values = utteranceConfig.slots[slotName].values || [];
      return `{${slotName}}`;
    }
    return '';
  });

  utteranceConfig.samples = (utteranceConfig.samples || []).concat(utteranceExpander(expander));
};
