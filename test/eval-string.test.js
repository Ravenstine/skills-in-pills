/* eslint no-template-curly-in-string:0 */

const assert = require('assert');
const evalString = require('../lib/eval-string');

describe('operators', () => {
  const context = {
    attributes: {
    },
  };

  it('processes template strings', () => {
    const evaluation = evalString('The result is ${1 + 2}.', context);
    assert.equal(evaluation, 'The result is 3.');
  });

  it('replaces with empty strings when undefined/null/NaN are passed', () => {
    const evaluation = evalString('This is a ${undefined} string.', context);
    assert.equal(evaluation, 'This is a  string.');
  });

  it('formats date strings to readable format', () => {
    const evaluation = evalString('It is currently ${new Date()}', context);
    const match = !!evaluation.match(/\d{1,2} \d{1,2} [am|pm]{2} on [A-z]+ \d{1,2} \d{4}/);
    assert.equal(match, true);
  });
});
