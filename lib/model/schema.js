module.exports = {

    "start":{
        type: Date,
        label: "start",
        alias: "s",
        required: true
    },
    "end": {
        type: Date,
        label: "end",
        alias: "e",
        required: true
    },
    "project": {
        type: String,
        label: "project",
        alias: "p",
        queryable: true
    },
    "task": {
        type: String,
        label: "task",
        alias: "t",
        queryable: true
    },
    "note": {
        type: String,
        label: "note",
        alias: "n",
        queryable: true
    }
};