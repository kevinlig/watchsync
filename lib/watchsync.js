#! /usr/bin/env node

/*
 * watchsync
 *
 * Copyright (c) 2014 Kevin Li
 * Licensed under the MIT license.
 */

'use strict';


var watch = require('njs-watch');
var colors = require('colors');
var exec = require('child_process').exec;

if (process.argv.length <= 3) {
	console.log("ERROR: watchsync requires source directory and destination directory.".red);
	return;
}

console.log("watchsync started.".green);

// determine the web app root path
var srcpath = process.argv[2];
var destpath = process.argv[3];

var watcher = watch.monitor(srcpath, function () {
	console.log("Changes detected. Performing rsync...".yellow);
	exec("rsync -r -u " + srcpath + " " + destpath,function (error, stdout, stderr) {
		console.log(String(stdout).grey);
		console.log("Sync complete.".green);
	});
});