#!/usr/bin/env node

'use strict';

const fs = require('fs');
const xml2js = require('xml2js');

module.exports = function (context) {
  const parseString = xml2js.parseString;
  const builder = new xml2js.Builder();
  const manifestPath = context.opts.projectRoot + '/platforms/android/AndroidManifest.xml';
  const androidManifest = fs.readFileSync(manifestPath).toString();

  let manifestRoot;

  if (androidManifest) {
    parseString(androidManifest, (err, manifest) => {
      if (err) return console.error(err);

      manifestRoot = manifest['manifest'];
      manifestRoot.$['xmlns:tools'] = 'http://schemas.android.com/tools';

      fs.writeFileSync(manifestPath, builder.buildObject(manifest));
      console.warn("###################################################");
      console.warn("xmlns:tools added in AndroidManifest.xml by NSSTMS");
      console.warn("###################################################");
    });
  }
};