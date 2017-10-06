const pillBox = require('./lib/pill-box');
const handler = require('./lib/handler');

module.exports = pillsDirectory => (handler)(pillBox(pillsDirectory));
