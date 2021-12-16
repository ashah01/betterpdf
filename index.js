/* Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/publicdomain/zero/1.0/ */

//
// Basic node example that prints document metadata and text content.
// Requires single file built version of PDF.js -- please run
// `gulp singlefile` before running the example.
//

// Run `gulp dist-install` to generate 'pdfjs-dist' npm package files.
const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");
var http = require('http');
const pdfPath =
  process.argv[2] || "./1409.3215.pdf";

// Will be using promises to load document, pages and misc data instead of
// callback.
output = ""
const loadingTask = pdfjsLib.getDocument(pdfPath);
loadingTask.promise.then((doc) => {
    for (let i = 1; i <= doc.numPages; i++) {
        doc.getPage(i).then((data) => {
            data.getTextContent().then((text) => {
                output += "" + text.items.map(item => item.str).join("")
            })
        })
    }
})

http.createServer(function (req, res) {
  res.write('<html><head></head><body>');
  res.write('<p>' + output + "</p>")
  res.end('</body></html>');
}).listen(3000);
// Loading file from file system into typed array