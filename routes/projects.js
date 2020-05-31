const router = require('express').Router();
let Project = require('../models/project.model');
let Task = require('../models/task.model');
let User = require('../models/user.model');
const authMiddleWare = require('../middleware/auth');

router.route('/getTasksForDev').post(authMiddleWare, (req, res) => {
    Task.find({userId: req.body.userId,
        projectId: req.body.projId})
        .then(task => res.json(task))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/').get(authMiddleWare, (req, res) => {
    Project.find()
        .then(projects => res.json(projects))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/:projectId').get(authMiddleWare, (req, res) =>{
    Project.find({administrator: req.params.projectId})
        .then(projects => res.json(projects))
        .catch(err => res.status(400).json('Error' + err));
});

router.route('/getProject/:id').get(authMiddleWare, (req, res) =>{
    Project.findById(req.params.id)
        .then(projects => res.json(projects))
        .catch(err => res.status(400).json('Error' + err));
});

router.route('/:name').get(authMiddleWare, (req, res) =>{
    Project.find({name: req.params.name})
        .then(projects => res.json(projects))
        .catch(err => res.status(400).json('Error' + err))
});

router.route('/add').post(authMiddleWare, (req, res) => {

    const name = req.body.name;
    const description = req.body.description;
    const administrator = req.body.admin;
    const customer = req.body.customer;
    const developers = req.body.developers;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;

    const NewProject = new Project({
        name,
        description,
        start_date,
        end_date,
        administrator,
        customer,
        developers,
    });

    NewProject.save()
        .then(() => res.json('Added Succesfully'))
        .catch(err => res.status(400).json('Error' + err));

});

router.route('/update/:id').post((req, res) => {
    Task.findById(req.params.id)
        .then(proj => {
            proj.name = req.body.name;
            proj.description = req.body.description;
            proj.administrator = req.body.admin;
            proj.customer = req.body.customer;
            proj.developers = req.body.developers;
            proj.start_date = req.body.start_date;
            proj.end_date = req.body.end_date;

            proj.save()
                .then(() => res.json('Updated succesfully'))
                .catch( err => res.status(400).json('Error ' + err))
        })

});

router.route('/:id/devs').get(authMiddleWare, (req, res) =>{
    let markedDevsList = [];

    Project.find({_id: req.params.id})
        .then(projects => res.json(projects[0].developers.filter((item) => {
            if(markedDevsList.includes(item))
                return false;
            else {
                markedDevsList.push(item);
                return true;
            }
        } )))
        .catch(err => res.status(400).json('Error' + err))
});


router.route('/findTasks').get(authMiddleWare, (req, res) => {
    Task.find({userId: req.body.userId, projectId: req.body.projId})
        .then(tasks => res.json(tasks))
        .catch(err => res.status(400).json('Error' + err))
});

router.route('/addDev').post(authMiddleWare, (req, res) => {
    let devs;

    Project.findById(req.body.projId)
        .then(proj => {
                devs = proj.developers;
                devs.push(req.body.userId);
                proj.developers = devs;
            //res.json(proj);
            proj.save()
                .then(() => res.json('Added succesfully'))
                .catch( err => res.status(400).json('Error ' + err))
        })
});

module.exports = router;