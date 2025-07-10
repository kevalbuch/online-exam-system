const mongoose = require('mongoose');

const studentSchema  = new moongoose.Schema({
    profileInfo:{
        type: moongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    attemptedTests:{
        type: Array,
    },
    testStatus: {
        type: Array, 
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
})

module.exports = mongoose.model('students', studentSchema);