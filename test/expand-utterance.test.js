/* eslint max-len:0 */

// const assert = require('assert');
const expandUtterance = require('../lib/expand-utterance');

describe('expand-utterance', () => {
  // const matcher = '(i would|i\'d) like [count:AMAZON.NUMBER] [snack:CustomType] [when:UnknownType]';

  const impliedTypeUtterance = 'look ma!  no [number] types!';

  const intent = {
    types: {
      CustomType: {
        values: [
          'apples',
          'oranges',
          'peanuts',
        ],
      },
    },
  };

  it('guesses an implied built-in type', () => {
    expandUtterance(impliedTypeUtterance, intent);
    // assert.deepEqual
  });
});
