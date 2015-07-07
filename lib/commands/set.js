var handleSetUnset = require('./common/handleSetUnset'),
    config = require('../config');

module.exports = function set(options, output) {
    handleSetUnset(options, config.set.bind(config), output)
};