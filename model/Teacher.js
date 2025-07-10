const moongoose = require('mongoose');

const teacherSchema = new moongoose.Schema({
    profileInfo:{
        type: moongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
})

module.exports = moongoose.model('teachers',teacherSchema);