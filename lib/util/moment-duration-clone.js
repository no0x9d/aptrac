var moment = require('moment');

moment.duration.fn.clone = function(){
    return moment.duration(this);
};