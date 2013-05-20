/*
 * grunt-netdna
 * https://github.com/ifeelgoods/grunt-netdna
 *
 * Copyright (c) 2013 Dali Kilani
 * Licensed under the MIT license.
 */

'use strict';
require('js-yaml');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('netdna', 'Interact with the NetDNA API', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var _this = this;
    var netdnaConfigPath = this.options.configPath || 'netdna.yml';

    if (!grunt.file.exists(netdnaConfigPath)) {
      grunt.fail.fatal("Can't find netdna API configuration @ " + netdnaConfigPath);
    }

    var netdnaConfig = require(require('path').resolve(netdnaConfigPath));
    var netdna = require('netdna')({
      companyAlias: netdnaConfig.netdna.companyAlias || 'companyAlias' ,
      consumerKey: netdnaConfig.netdna.consumerKey || 'consumerKey-XXXX',
      consumerSecret: netdnaConfig.netdna.consumerSecret || 'consumerSecret-YYYY'
    });

    var options = this.options({
      zone_id: '94700'
    });

    netdna.get('account.json', function (err, response) {
      if (err) {
        console.log(err);
      }
      console.log(response);
    });
    
    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      grunt.log.ok("file =");
      grunt.log.ok(f.orig.src);

      //_this.netdna.get('zones/pull/' + options.zone_id + '/customdomains.json', function (err, response) {
      //_this.netdna.get('zones/pull/94700/customdomains.json', function (err, response) {
      //  if (err) {
      //    console.log(err);
      //  }
      //  console.log(response);
      //});
      
      /*
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join(grunt.util.normalizelf(options.separator));

      // Handle options.
      src += options.punctuation;

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');*/
    });
  });

};
