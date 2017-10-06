const assert = require('assert');
const assign = require('../lib/builders/assign');

describe('operators', () => {
  const context = {
    attributes: {
      setTest: undefined,
      setTest1: undefined,
      setTest2: undefined,
      stringTest: 'hello',
      numberTest: 0,
      stringNumberTest: '3',
      arrayTest: [1, 2, 3],
      objectTest: {},
      dateTest: undefined,
      nullText: null,
      eraseTest: 'erase me!',
      expressionTest: undefined,
      booleanTest: undefined,
    },
    slots: {
      foo: 'bar',
    },
  };

  it('sets a boolean', () => {
    assign(context.attributes, {
      set: {
        booleanTest: true,
      },
    }, context);
    assert.equal(context.attributes.booleanTest, true);
  });

  it('sets a multiple values', () => {
    assign(context.attributes, {
      set: {
        setTest1: 'a',
        setTest2: 'b',
      },
    }, context);
    assert.equal(context.attributes.setTest1 === 'a', true);
    assert.equal(context.attributes.setTest2 === 'b', true);
  });


  it('increments a number attribute', () => {
    assign(context.attributes, {
      increment: {
        numberTest: 3,
      },
    }, context);
    assert.equal(context.attributes.numberTest, 3);
  });

  it('increments a string attribute', () => {
    assign(context.attributes, {
      increment: {
        stringNumberTest: 4,
      },
    }, context);
    assert.equal(context.attributes.stringNumberTest, 7);
  });

  it('increments a number attribute with a string', () => {
    assign(context.attributes, {
      increment: {
        numberTest: '2',
      },
    }, context);
    assert.equal(context.attributes.numberTest, 5);
  });

  it('increments a non-zero attribute', () => {
    assign(context.attributes, {
      increment: {
        numberTest: 3,
      },
    }, context);
    assert.equal(context.attributes.numberTest, 8);
  });

  it('decrements an attribute', () => {
    assign(context.attributes, {
      increment: {
        numberTest: -2,
      },
    }, context);
    assert.equal(context.attributes.numberTest, 6);
  });

  it('does not try to increment a non-number', () => {
    const originalObject = context.attributes.objectTest;
    assign(context.attributes, {
      increment: {
        objectTest: -2,
      },
    }, context);
    assert.equal(context.attributes.objectTest, originalObject);
  });

  it('erases attributes', () => {
    // const originalObject = context.attributes.objectTest;
    assign(context.attributes, {
      erase: {
        eraseTest: undefined,
      },
    }, context);
    assert.equal(Object.keys(context.attributes).indexOf('eraseTest'), -1);
  });

  it('appends items to an array', () => {
    assign(context.attributes, {
      append: {
        arrayTest: 4,
      },
    }, context);
    assert.equal(context.attributes.arrayTest[context.attributes.arrayTest.length - 1], 4);
  });

  it('prepends items to an array', () => {
    assign(context.attributes, {
      prepend: {
        arrayTest: 5,
      },
    }, context);
    assert.equal(context.attributes.arrayTest[0], 5);
  });

  it('can assign a date', () => {
    assign(context.attributes, {
      date: {
        dateTest: 'today',
      },
    }, context);
    const isDate = Object.prototype.toString.call(context.attributes.dateTest) === '[object Date]';
    assert.equal(isDate, true);
  });

  it('can assign from an expression', () => {
    assign(context.attributes, {
      expression: {
        expressionTest: '40 + 2',
      },
    }, context);
    assert.equal(context.attributes.expressionTest, 42);
  });

  it('can assign from an intent slot', () => {
    assign(context.attributes, {
      slot: {
        baz: 'foo',
      },
    }, context);
    assert.equal(context.attributes.baz, 'bar');
  });
});
