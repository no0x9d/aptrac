var handleSetUnset = require('./common/handleSetUnset'),
    config = require('../config');

module.exports = function unset(options) {
    handleSetUnset(options, config.unset.bind(config))
};