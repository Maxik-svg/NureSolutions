const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const projectSchema = new Schema({
        project_name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 5,
        },
        project_description: {
            type: String,
            trim: true,
        },
        project_administrator: {
            type: Object
        },
        project_customer: {
            type: Object,
        },
        developers: {
            type: [Object],
        }
    },
    {
        timestamps: true,
    });

const Project = new mongoose.model('Project', projectSchema);
module.exports = Project;

