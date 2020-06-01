const router = require('express').Router();
let Project = require('../models/project.model');
let Task = require('../models/task.model');
let User = require('../models/user.model');
const authMiddleWare = require('../middleware/auth');


router.route('/global/tasksDone').post(authMiddleWare, (req, res) => {
    Task.find({userId: req.body.userId,
        projectId: req.body.projId})
        .then(task => res.json(task))
        .catch(err => res.status(400).json('Error: ' + err))
});




module.exports = router;