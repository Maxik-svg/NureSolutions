const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
        name:{
            type:String
        },
        userId: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        isCompleted:{
            type: Boolean,
        }
    },
    {
        timestamps: true,
    });

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;