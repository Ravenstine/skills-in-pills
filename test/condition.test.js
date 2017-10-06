const assert = require('assert');
const condition = require('../lib/builders/condition');
const generateContext = require('../lib/context-generator');

describe('operators', () => {
  const context = generateContext();
  context.attributes.hasTreasure = true;

  it('navigates based on a value', () => {
    const sampleCondition = {
      value: 'attributes.hasTreasure',
      'if true': {
        'go to': 'win',
      },
      'if false': {
        'go to': 'lose',
      },
    };
    condition(sampleCondition, context);
    assert.equal(context.sessionAttributes.LABEL, 'win');
  });
});
