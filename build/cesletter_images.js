var cpx = require("cpx");
var imagePath = require.resolve('cesletter/package.json').replace('package.json', '') + 'dist/img';

var name = process.argv[2];
var destinationDir = process.argv[3];

cpx.copy(imagePath + name, destinationDir);
