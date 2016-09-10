var fs = require('fs');
var exec = require('child_process').exec;
var Handlebars = require('handlebars');
var minify = require('html-minifier').minify;
var offline = require('cesletter').offlineHtml;

var name = 'cesletter';
var destinationDir = process.argv[2];

var hbDir = 'src/templates/';

fs.readFile(hbDir + 'partials/footer.hbs', 'utf8', (footerReadErr, footerData) => {
  if (footerReadErr) {
    console.log(footerReadErr);
  }

  var footer = Handlebars.compile(footerData)();

  fs.readFile(hbDir + 'headers/' + name + '.hbs', 'utf8', (headerNameReadErr, headerNameData) => {
    if (headerNameReadErr) {
      console.log(headerNameReadErr);
    }

    var headerName = Handlebars.compile(headerNameData)();

    fs.readFile(hbDir + 'partials/navbar.hbs', 'utf8', (navbarReadErr, navbarData) => {
      if (navbarReadErr) {
        console.log(navbarReadErr);
      }

      var navbar = Handlebars.compile(navbarData)({
        header: headerName,
      });


      fs.readFile(hbDir + 'partials/cesletter.hbs', 'utf8', (baseReadErr, baseData) => {
        if (baseReadErr) {
          console.log(baseReadErr);
        }

        var output = minify(Handlebars.compile(baseData)({
          header: headerName,
          page: name,
          navbarTemplate: navbar,
          content: offline,
          footerTemplate: footer,
        }), {
          useShortDoctype: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          removeComments: true,
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeEmptyAttributes: true,
        });
        
        exec('mkdir -p ' + destinationDir, () => {
          fs.writeFile(destinationDir + '/' + name + '.html', output, (writeErr) => {
            if (writeErr) {
              console.log(writeErr);
            }
          });
        });
      });
    });
  });
});