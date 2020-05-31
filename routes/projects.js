const router = require('express').Router();
let Project = require('../models/project.model');
let User = require('../models/user.model');
const authMiddleWare = require('../middleware/auth');

router.route('/').get(authMiddleWare, (req, res) => {
    Project.find()
        .then(projects => res.json(projects))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/:id').get( (req, res) =>{
    let data = {project:[], user:[]};


    Project.find({administrator: req.params.id})
        .then(projects => data.project = projects)
        .catch(err => res.status(400).json('Error' + err));
    User.findById(req.params.id)
        .then(user => {
            data.user = user;
            return res.json(data);
        })
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
    //const tasksIds = req.body.tasksIds;

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

router.route('/:name/devs').get(authMiddleWare, (req, res) =>{
    Project.find({name: req.params.name})
        .then(projects => res.json(projects[0].developers))
        .catch(err => res.status(400).json('Error' + err))
});

module.exports = router;