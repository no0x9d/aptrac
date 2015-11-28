var handleSetUnset = require('./common/handleSetUnset');

module.exports = function unset(options, output) {
    handleSetUnset.call(this, options, this.config.unset.bind(this.config), output)
};