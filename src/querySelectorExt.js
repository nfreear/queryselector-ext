/*!

  License: MIT
  Copyright © Nick Freear, 6 April 2016.

  https://npmjs.com/search?q=querySelector
  https://google.co.uk/search?q=querySelector+parent
  https://github.com/umdjs/umd/blob/master/templates/returnExports.js
  http://ifandelse.com/its-not-hard-making-your-library-support-amd-and-commonjs/
  http://know.cujojs.com/tutorials/modules/authoring-umd-modules
*/

(function (root, factory) {
    'use strict';

    var name = 'querySelectorExt';

    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
        //define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('jquery'));
        //module.exports = factory();
    } else {
        // Browser globals (root is window)
        root[ name ] = factory(root.jQuery);
        //root.returnExports = factory();
    }

}(this, function (jQuery) {
    'use strict';

    var QSE = function querySelectorExt(selector, debug) {
        var $ = jQuery
          , tokens = selector && selector.split(/\:/)
          , next_sel ///= tokens.shift()
          , length = tokens && tokens.length
          , idx = 0
          , next
          , matches
    			, done_sel = false
          //, $progress
          , $result;

        if (! selector) {
            return null;
        }

        if (selector.match(/^--\w+/)) {
            return "Hi from 'querySelectorExt'.";
        }

        log('jQuery:', typeof jQuery, typeof $);
        log('tokens:', tokens);

        next_sel = tokens.shift();

        if (selector.match(/.+\:(closest|find)\([^\:]*\)(\:|$)/)) {
            // The 'extended' route.
            for (idx = 0; idx < length - 1; idx++) {
                next = tokens.shift();
                matches = next.match(/^(closest|find)\(([^\)]*)\)$/);
                if (matches) {
                    // Stop!
    								if (! done_sel) {
    									  done_sel = true;
                        $result = $(next_sel);
    							  }
                    if ('find' === matches[ 1 ]) {
                        $result = $result.find(matches[ 2 ]);
                        log("find:", $result);
                    }
                    else if ('closest' === matches[ 1 ]) {
                        $result = $result.closest(matches[ 2 ]);
                        log("closest:", $result);
                    }
                } else {
                    next_sel += ':' + next;
                }
                log(">> it:", idx, matches, next, $result);
            }
        } else {
            // The 'simple' route.
            //Was: result = document.querySelector(selector);
            $result = $(selector);
        }
        log("$ex:", $result, next_sel, next);


        function log(str) {
            return debug && debug(1 === arguments.length ? str : arguments);
        }

        return $result;
    };


    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.
    //return {};
    return QSE;
}));
