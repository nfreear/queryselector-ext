/*!
  Unit tests, built on Chai and Mocha.

  @author Nick Freear, 6 April 2016.
  @link http://chaijs.com/api/bdd/
*/

'use strict';

var jsdom = require('jsdom')
  , chai = require('chai')
  , expect = chai.expect
  , dir = __dirname
  , debug = false
  , selector = '[ name = fpsa2 ]:first'
  , selector_row = '[name = fpsa2]:closest(tr)'
  , selector_label = '[ name = fpsa2 ]:closest( tr ):find( th )';

chai.should();

before(function () {
  console.log("before");
});

describe('jQuery', function () {
  this.timeout(2000);

  it("jQuery and $ should exist and have a version number like '1.12.3'.", function (done) {

    jsdom.env(
      dir + '/form-test.html',
      //[ 'http://code.jquery.com/jquery.js' ],
      [ dir + '/../node_modules/jquery/dist/jquery.js' ],
      function (err, window) {
        var $ = window.jQuery;

        expect($, 'jQuery').to.be.a('function');
        expect($.fn.jquery, 'version').to.equal('1.12.3');
        expect($('html').attr('lang'), 'lang').to.equal('en');

        console.log('jQuery:', $.fn.jquery);
        console.log('Page title: ', $('title').text());
        console.log('UA: ', window.navigator.userAgent);

        done();
      }
    );

  });
});


describe('querySelectorExt', function () {
  this.timeout(2000);

  it('QSE should be a function and allow simple and extended selector queries.', function (done) {

    jsdom.env(
      dir + '/form-test.html',
      [ dir + '/../node_modules/jquery/dist/jquery.js',
        dir + '/../src/querySelectorExt.js' ],
      function (err, window) {
        var qse = window.querySelectorExt;

        expect(window, 'window').to.be.an('object');
        expect(err, 'err').to.be.a('null');
        expect(qse, 'qse').to.be.a('function');

        var $field = qse(selector, debug ? console.log : null)
          , $row = qse(selector_row)
          , $label = qse(selector_label);

        expect($field, '$field').to.be.an('object');
        expect($field, '$field.length').to.have.lengthOf(1);

        expect($row, '$row').to.be.an('object');
        expect($row, '$row.length').to.have.lengthOf(1);

        expect($label, '$label').to.be.an('object');
        expect($label.length, '$label.length').to.equal(1);

        //expect(typeof $label[ 0 ], 'typeof $label').to.be.an('HTMLTableHeaderCellElement');
        expect($label[ 0 ]).to.be.an('object');
        expect($label[ 0 ].tagName).to.equal('TH');
        expect($label[ 0 ].namespaceURI).to.equal('http://www.w3.org/1999/xhtml')
        expect($label[ 0 ].textContent).to.equal('Staff ID');
        expect($label.text()).to.equal('Staff ID');

        console.log('QSE:   ', qse('--HI'));
        console.log('$field: ', typeof $field, $field.length);
        console.log('$label:', $label[ 0 ]);

        done();
      }
    );

  });
});



return;



// Count all of the links from the io.js build page
// https://www.npmjs.com/package/jsdom#easymode-jsdomenv

jsdom.env(
  "https://iojs.org/dist/",
  ["http://code.jquery.com/jquery.js"],
  function (err, window) {
    console.log("there have been", window.$("a").length - 4, "io.js releases!");
  }
);
