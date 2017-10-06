/* eslint no-prototype-builtins:0 */

const assert = require('assert');
const cutPill = require('../lib/pill-cutter');

describe('speak', () => {
  it('omits template objects', () => {
    const pill = {
      '.some-template': {
        speak: 'goodbye world',
      },
      entrypoint: {
        speak: 'hello world',
      },
    };
    cutPill(pill);
    assert.equal(pill.hasOwnProperty('.some-template'), false);
  });
});
