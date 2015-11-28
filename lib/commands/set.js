var handleSetUnset = require('./common/handleSetUnset');

module.exports = function set(options, output) {
    handleSetUnset.call(this, options, this.config.set.bind(this.config), output)
};