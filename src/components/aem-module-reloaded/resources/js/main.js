(function() {
    'use strict';

    var test = function(a) {
        return 'foo: ' + a;
    };
    console.log('main.js executed: ' + test(4));
})();
