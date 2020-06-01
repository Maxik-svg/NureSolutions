const router = require('express').Router();
let Project = require('../models/project.model');
let Task = require('../models/task.model');
let User = require('../models/user.model');
const authMiddleWare = require('../middleware/auth');

router.route('/global/tasksDone/:adminId').post(authMiddleWare, (req, res) => {
    let allProjects = [];
   // let keyValuePair = {projectId: a, tasks: []}
    let allPairs = [];

    Project.find({administrator: req.params.adminId})
        .then(projects => allProjects = projects)
        .then(() => {
            for (let i = 0; i < allProjects.length; i++){
                currProjectId = allProjects[i]._id;

                Task.find({projectId: currProjectId})
                    .then(currTasks => {
                        let countDone = 0;
                        let allCount = currTasks.length;

                        for (let j = 0; j < allCount; j++){
                            if(currTasks[j].isCompleted)
                                countDone++;
                        }

                        allPairs.push({projectId: currProjectId, prcentDone: countDone/allCount * 100});
                    })
                    .catch(err => res.status(400).json('Error: ' + err))
            }
        })
        .then(() => {res.json(allPairs)})
        .catch(err => res.status(400).json('Error' + err));


});




module.exports = router;