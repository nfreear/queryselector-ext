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
  , debug = false
  , select_fail_empty  = '[ name = fpsa2 ]:closest()'
  , select_fail_comma  = '[ name = fpsa2 ]:closest( tr ) , .after-a-comma'
  , select_fail_parent = '[ name = fpsa2 ]:parent( opt )'  // Or: ':parent()'
  , select_fail_pseudo = '[ name = fpsa2 ]:closest( tr ):th';

chai.should();

describe('Failures', function () {
  this.timeout(2000);

  it('Empty function-selector failure case.', function (done) {
    jsdom.env(
      dir + '/form-test.html',
      [ dir + '/../node_modules/jquery/dist/jquery.js',
        dir + '/../src/querySelectorExt.js' ],
      function (err, window) {
        var qse = window.querySelectorExt;

        expect(window, 'window').to.be.an('object');
        expect(err, 'err').to.be.a('null');
        expect(qse, 'qse').to.be.a('function');

        var $empty = qse(select_fail_empty, debug ? console.log : null);

        expect($empty, '$empty').to.be.an('object');
        expect($empty).to.have.lengthOf(0);

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
          , $anull = qse();

        expect(qse, 'qse').to.be.a('function');

        expect($anull, '$anull').to.be.a('null');

        done();
      }
    );
  });


  it('XX  Comma failure case.', function (done) {
    done(); return;

    jsdom.env(
      dir + '/form-test.html',
      [ dir + '/../node_modules/jquery/dist/jquery.js',
        dir + '/../src/querySelectorExt.js' ],
      function (err, window) {
        var qse = window.querySelectorExt;

        expect(window, 'window').to.be.an('object');
        expect(err, 'err').to.be.a('null');
        expect(qse, 'qse').to.be.a('function');

        // Uncaught Error: Syntax error, unrecognized expression: unsupported pseudo: closest
        expect(qse, 'ex').to.throw('Syntax error, unrecognized expression: unsupported pseudo: closest');
        var $comma = qse(select_fail_comma, debug ? console.log : null);

        console.log("Fails:", $comma);

        expect($comma, '$comma').to.be.an('object');

        // 1 not 2, inspite of the comma.
        //expect($comma).to.have.lengthOf(1);

        done();
      }
    );
  });


  it('XX  Unrecognised function failure case -- parent()', function (done) {
    done(); return;

    jsdom.env(
      dir + '/form-test.html',
      [ dir + '/../node_modules/jquery/dist/jquery.js',
        dir + '/../src/querySelectorExt.js' ],
      function (err, window) {
        var qse = window.querySelectorExt;

        expect(window, 'window').to.be.an('object');
        expect(err, 'err').to.be.a('null');
        expect(qse, 'qse').to.be.a('function');

        //expect(qse, 'ex2').to.throw('Cannot read property \'split\' of undefined');
        var $parent = qse(select_fail_parent);
        var $pseudo = qse(select_fail_pseudo);

        expect($parent).to.have.lengthOf(0);
        expect($pseudo).to.have.lengthOf(0);

        done();
      }
    );
  });

});
