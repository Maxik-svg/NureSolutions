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
        date_start: {
            type: Date,
            required: true,
        },
        date_end:{
            type: Date,
            required: true,
        },
        isCompleted:{
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
    });

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;