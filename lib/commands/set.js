var handleSetUnset = require('./common/handleSetUnset'),
    config = require('../config');

module.exports = function set(options) {
    handleSetUnset(options, config.set.bind(config))
};