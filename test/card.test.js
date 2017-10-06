const assert = require('assert');
const card = require('../lib/builders/card');

describe('operators', () => {
  const context = {
    attributes: {
    },
    response: {

    },
    responseBody: {},
  };

  it('adds a simple card object to the response', () => {
    const cardInput = { title: 'hello', content: 'hello world' };
    card(cardInput, context);
    assert.deepEqual({ type: 'Simple', title: 'hello', content: 'hello world' }, context.responseBody.card);
  });
});
