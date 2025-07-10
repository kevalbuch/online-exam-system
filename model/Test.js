const moongose = require('mongoose');

const testSchema = new moongose.Schema({
    teacherId:{
        type: moongose.Schema.Types.ObjectId,
        ref: 'teachers',
        // required: true
    },
    testName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    className: {
        type: String,
        required: true
    },
    minutes: {
        type: Number,
        required: true
    },
    rules: {
        type: String,
        required: true
    },
    outOfMarks: {
        type: Number,
        required: true
    },
    questions: {
        type: Array,
        required: true
    },
    assignedTo: {
        type: Array,
        // default: []
    },
    attempted:{
        type: boolean,
        default: false
    },
    answers: {
        type: Array,
        default: []
    },
    submitBy:{
        type: Array,
    }
})

module.exports = moongose.model('tests',testSchema)