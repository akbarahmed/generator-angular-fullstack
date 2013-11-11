'use strict';

/**
 * Test index page
 */
exports.index = function(req, res, next) {
    res.render('test/index', {
        productName: 'Exponential'
    });
};

