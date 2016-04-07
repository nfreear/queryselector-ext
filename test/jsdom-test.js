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

describe('querySelectorExt', function () {
  this.timeout(2000);

  it('querySelectorExt should be a function and allow simple selector queries.', function (done) {

    jsdom.env(
      dir + '/form-test.html',
      [ dir + '/../node_modules/jquery/dist/jquery.js',
        dir + '/../src/querySelectorExt.js' ],
      function (err, window) {
        var qse = window.querySelectorExt;

        expect(window, 'window').to.be.an('object');
        expect(err, 'err').to.be.a('null');
        expect(qse, 'qse').to.be.a('function');

        var $field = qse(selector, debug ? console.log : null);

        expect($field, '$field').to.be.an('object');
        expect($field, '$field.length').to.have.lengthOf(1);

        console.log('QSE:   ', qse('--HI'));
        console.log('$field: ', typeof $field, $field.length);

        done();
      }
    );

  });



  it('It should allow extended selector queries.', function (done) {

    jsdom.env(
      dir + '/form-test.html',
      [ dir + '/../node_modules/jquery/dist/jquery.js',
        dir + '/../src/querySelectorExt.js' ],
      function (err, window) {
        var qse = window.querySelectorExt;

        expect(err, 'err').to.be.a('null');

        var $row = qse(selector_row)
          , $label = qse(selector_label);

        expect($row, '$row').to.be.an('object');
        expect($row, '$row.length').to.have.lengthOf(1);

        expect($label, '$label').to.be.an('object');
        expect($label.length, '$label.length').to.equal(1);

        //expect(typeof $label[ 0 ], 'typeof $label').to.be.an('HTMLTableHeaderCellElement');
        expect($label[ 0 ]).to.be.an('object');
        expect($label[ 0 ].tagName).to.equal('TH');
        expect($label[ 0 ].namespaceURI).to.equal('http://www.w3.org/1999/xhtml');
        expect($label[ 0 ].textContent).to.equal('Staff ID');
        expect($label.text()).to.equal('Staff ID');

        console.log('QSE:   ', qse('--HI'));
        console.log('$label:', $label[ 0 ]);

        done();
      }
    );

  });
});
