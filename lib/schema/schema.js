module.exports = {
    "project": {
        type: String,
        label: "project",
        alias: "p",
        description: "project for the task",
        queryable: true
    },
    "task": {
        type: String,
        label: "task",
        alias: "t",
        description: "a short task description",
        queryable: true
    },
    "note": {
        type: String,
        label: "notes",
        alias: "n",
        description: "additional notes",
        queryable: true
    }
};