/*!
  Unit tests, just for jQuery.

  @author Nick Freear, 6 April 2016.
  @link http://chaijs.com/api/bdd/
*/

'use strict';

var jsdom = require('jsdom')
  , chai = require('chai')
  , expect = chai.expect
  , dir = __dirname;

chai.should();

describe('jQuery', function () {
  this.timeout(2000);

  it("jQuery and $ should exist and have a version number like '1.12.3'.", function (done) {

    jsdom.env(
      dir + '/form-test.html',
      [ dir + '/../node_modules/jquery/dist/jquery.js' ],
      function (err, window) {
        var $ = window.jQuery;

        expect(err, 'err').to.be.a('null');

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
