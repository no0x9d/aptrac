var handleSetUnset = require('./common/handleSetUnset'),
    config = require('../config');

module.exports = function set() {
    handleSetUnset(this, config.set.bind(config))
};