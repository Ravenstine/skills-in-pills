/* eslint prefer-destructuring:0 */

const fs = require('fs');
const YAML = require('js-yaml');
const glob = require('glob-fs')({ gitignore: true });
const cutPill = require('./pill-cutter');

function loadPillYaml(pillsDirectory, pillName) {
  let yaml = fs.readFileSync(`${pillsDirectory}/${pillName}.yml`, 'utf8');
  const segments = yaml.split(/[-]{3,}/); // a set of 3 or more dashes denotes a section
  let metadata;
  let imports;
  const pill = [];
  if (segments.length > 1) {
    metadata = YAML.safeLoad(segments[0]) || {}; // parse metadata section
    yaml = segments[1];
    if (typeof metadata.import === 'string') {
      imports = [metadata.import];
    } else {
      imports = metadata.import || [];
    }
    // If other pills are listed under import: in the metadata section,
    // load them and prepend to the current pill YAML text in order.
    imports.forEach(pillName1 => pill.push(loadPillYaml(pillsDirectory, pillName1)));
  }
  pill.push(yaml);
  return pill.join('\r\n');
}

module.exports = (pillsDirectory) => {
  const pills = {};

  glob.readdirSync(`${pillsDirectory}/**/*.yml`).forEach((f) => {
    // match the name of the pill from the file name
    const pillKey = f.replace(pillsDirectory, '').match(/\/([\w|\-|/]+)\.yml/)[1];
    if (pillKey) {
      let pill;
      try {
        pill = YAML.safeLoad(loadPillYaml(pillsDirectory, pillKey));
      } catch (err) {
        return;
      }
      if (!pill) { return; }
      cutPill(pill);
      pills[pillKey] = pill;
    }
  });

  return pills;
};
