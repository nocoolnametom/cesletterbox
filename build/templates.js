var fs = require('fs');
const exec = require('child_process').exec;
var Handlebars = require('handlebars');
var minify = require('html-minifier').minify;

var name = process.argv[2];
var destinationDir = process.argv[3];

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


    fs.readFile(hbDir + 'partials/header.hbs', 'utf8', (headerReadErr, headerData) => {
      if (headerReadErr) {
        console.log(headerReadErr);
      }

      var header = Handlebars.compile(headerData)({
        header: headerName,
      });

      fs.readFile(hbDir + 'partials/navbar.hbs', 'utf8', (navbarReadErr, navbarData) => {
        if (navbarReadErr) {
          console.log(navbarReadErr);
        }

        var navbar = Handlebars.compile(navbarData)({
          header: headerName,
        });

        fs.readFile(hbDir + 'pages/' + name + '.hbs', 'utf8', (contentReadErr, contentData) => {
          if (contentReadErr) {
            console.log(contentReadErr);
          }

          var content = Handlebars.compile(contentData)();


          fs.readFile(hbDir + 'partials/base.hbs', 'utf8', (baseReadErr, baseData) => {
            if (baseReadErr) {
              console.log(baseReadErr);
            }

            var output = minify(Handlebars.compile(baseData)({
              header: headerName,
              page: name,
              navbarTemplate: navbar,
              headerTemplate: header,
              content: content,
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
  });
});