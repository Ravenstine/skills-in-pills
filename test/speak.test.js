const assert = require('assert');
const speak = require('../lib/builders/speak');
const generateContext = require('../lib/context-generator');

describe('speak', () => {
  it('takes a string', () => {
    const context = generateContext();
    speak('hello world', context);
    assert.equal(context.responseBody.outputSpeech.ssml, '<speak>hello world </speak>');
  });

  it('takes a locale object and defaults to english', () => {
    const context = generateContext();
    speak({ 'en-US': 'hello world' }, context);
    assert.equal(context.responseBody.outputSpeech.ssml, '<speak>hello world </speak>');
  });

  it('selects the locale in the context', () => {
    const context = generateContext();
    context.requestBody.locale = 'de-DE';
    speak({ 'en-US': 'hello world', 'de-DE': 'hallo welt' }, context);
    assert.equal(context.responseBody.outputSpeech.ssml, '<speak>hallo welt </speak>');
  });

  it('joins an array', () => {
    const context = generateContext();
    speak(['bananas', 'oranges', 'apples'], context);
    const didMatch = !!context.responseBody.outputSpeech.ssml.match(/apples|bananas|oranges/);
    assert.equal(didMatch, true);
  });

  it('joins a locale array', () => {
    const context = generateContext();
    speak({ 'en-US': ['bananas', 'oranges', 'apples'] }, context);
    const didMatch = !!context.responseBody.outputSpeech.ssml.match(/apples|bananas|oranges/);
    assert.equal(didMatch, true);
  });

  it('picks random string from array', () => {
    const context = generateContext();
    speak({ 'en-US': { random: ['bananas', 'oranges', 'apples'] } }, context);
    const didMatch = !!context.responseBody.outputSpeech.ssml.match(/apples|bananas|oranges/);
    assert.equal(didMatch, true);
  });

  it('inserts a break', () => {
    const context = generateContext();
    speak([
      'hello',
      { break: 'medium' },
      'workd',
    ], context);
    const didMatch = !!context.responseBody.outputSpeech.ssml.match(/<break strength="medium"\/>/);
    assert.equal(didMatch, true);
  });

  it('inserts a timed pause', () => {
    const context = generateContext();
    speak([
      'hello',
      { pause: '2s' },
      'workd',
    ], context);
    const didMatch = !!context.responseBody.outputSpeech.ssml.match(/<break time="2s"\/>/);
    assert.equal(didMatch, true);
  });

  it('inserts audio', () => {
    const context = generateContext();
    speak([
      'hello',
      { audio: 'http://test.audio' },
      'workd',
    ], context);
    const didMatch = !!context.responseBody.outputSpeech.ssml.match(/<audio src="http:\/\/test.audio"\/>/);
    assert.equal(didMatch, true);
  });
});
