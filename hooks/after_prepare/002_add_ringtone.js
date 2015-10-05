#!/usr/bin/env node
/**
 * Copy ringtone file for android
 *
 */
var fs = require("fs");
var path = require("path");
var rootdir = process.argv[2];

console.log("Running hook: " + path.basename(process.env.CORDOVA_HOOK));

var srcfile = path.join(rootdir, "www", "sounds/ringing-2.mp3");

// Define the destination paths for the config.js file for each platform
var ringtonePaths = {
    "android" : "platforms/android/res/raw/ringing.mp3"
};

var platforms = process.env.CORDOVA_PLATFORMS.split(',');

for(var i=0; i < platforms.length; i++) {
    console.log("Adding ringtone for " + platforms[i] + " \n");
    var destfile = path.join(rootdir, ringtonePaths[platforms[i]]);

    if (!fs.existsSync(srcfile)) {
         throw "Missing ringtone file: " + srcfile;
    } else {
        console.log("copying " + srcfile + " to " + destfile);

        var srcContent = fs.readFileSync(srcfile, 'utf8');
        fs.writeFileSync(destfile, srcContent, 'utf8');

    }
}
