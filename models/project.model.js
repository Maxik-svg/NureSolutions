const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const projectSchema = new Schema({
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 5,
        },
        description: {
            type: String,
            trim: true,
        },
        administrator: {
            type: String
        },
        customer: {
            type: String,
        },
        developers: {
            type: [String],
        },
        start_date: {
            type: Date,
        },
        end_date: {
            type: Date,
        }
    },
    {
        timestamps: true,
    });

const Project = new mongoose.model('Project', projectSchema);
module.exports = Project;

