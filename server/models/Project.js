var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var projectSchema = new Schema(
    {
        owner: {
            type: String,
        },
        name: String,
        description: String,
    },
    { timestamps: true }
)

var Project = mongoose.model('Project', projectSchema);

module.exports.schema = projectSchema;
module.exports.model = Project;