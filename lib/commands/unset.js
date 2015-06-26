var handleSetUnset = require('./common/handleSetUnset'),
    config = require('../config');

module.exports = function unset() {
    handleSetUnset(this, config.unset.bind(config))
};