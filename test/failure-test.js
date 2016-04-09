/*!
  Unit tests to express failure cases.

  @author Nick Freear, 6 April 2016.
  @link http://chaijs.com/api/bdd/
*/

'use strict';

var jsdom = require('jsdom')
  , chai = require('chai')
  , expect = chai.expect
  , dir = __dirname
  , select_fail_empty  = '[ name = fpsa2 ]:closest()'
  , select_fail_comma  = '[ name = fpsa2 ]:closest( tr ) , .after-a-comma'
  , select_fail_parent = '[ name = fpsa2 ]:parent( opt )'  // Or: ':parent()'
  , select_fail_pseudo = '[ name = fpsa2 ]:closest( tr ):th';

chai.should();

describe('Failure cases:', function () {
  this.timeout(2000);

  it('Empty function-selector failure case.', function (done) {
    jsdom.env(
      dir + '/form-test.html',
      [ dir + '/../node_modules/jquery/dist/jquery.js',
        dir + '/../src/querySelectorExt.js' ],
      function (err, window) {
        var qse = window.querySelectorExt
          , empty_fn = function () {
            qse(select_fail_empty);
          };

        expect(window, 'window').to.be.an('object');
        expect(err, 'err').to.be.a('null');
        expect(qse, 'qse').to.be.a('function');

        expect(empty_fn, 'Ex empty').to.throw(/empty function pseudo/);

        done();
      }
    );
  });

  it('Undefined function call failure case.', function (done) {
    jsdom.env(
      dir + '/form-test.html',
      [ dir + '/../node_modules/jquery/dist/jquery.js',
        dir + '/../src/querySelectorExt.js' ],
      function (err, window) {
        var qse = window.querySelectorExt
          , missing_param_fn = function () {
            qse();
          };

        expect(err, 'err').to.be.a('null');

        expect(missing_param_fn).to.throw(/missing parameter: selector/);

        done();
      }
    );
  });


  it('Comma failure case.', function (done) {

    jsdom.env(
      dir + '/form-test.html',
      [ dir + '/../node_modules/jquery/dist/jquery.js',
        dir + '/../src/querySelectorExt.js' ],
      function (err, window) {
        var qse = window.querySelectorExt
          , comma_fn = function () {
            qse(select_fail_comma);
          };

        expect(window, 'window').to.be.an('object');
        expect(err, 'err').to.be.a('null');
        expect(qse, 'qse').to.be.a('function');

        expect(comma_fn).to.be.a('function');
        expect(comma_fn, 'Ex comma').to.throw('Syntax error, unrecognized expression: unsupported pseudo: closest');

        done();
      }
    );
  });


  it('Unrecognised function failure case -- parent()', function (done) {

    jsdom.env(
      dir + '/form-test.html',
      [ dir + '/../node_modules/jquery/dist/jquery.js',
        dir + '/../src/querySelectorExt.js' ],
      function (err, window) {
        var qse = window.querySelectorExt;

        expect(err, 'err').to.be.a('null');

        var $parent = qse(select_fail_parent);

        // 'Error' answer: 0, not 1.
        expect($parent, 'parent()').to.not.have.lengthOf(1);
        expect($parent, 'parent()').to.have.lengthOf(0);

        done();
      }
    );
  });


  it('Unexpected PSEUDO failure case', function (done) {

    jsdom.env(
      dir + '/form-test.html',
      [ dir + '/../node_modules/jquery/dist/jquery.js',
        dir + '/../src/querySelectorExt.js' ],
      function (err, window) {
        var qse = window.querySelectorExt;

        expect(err, 'err').to.be.a('null');

        var $pseudo = qse(select_fail_pseudo);

        // Error: we want 'TH'; instead we get 'TR'.
        expect($pseudo).to.have.lengthOf(1);
        expect($pseudo[ 0 ].tagName).to.not.equal('TH');
        expect($pseudo[ 0 ].tagName).to.equal('TR');

        done();
      }
    );
  });

});
