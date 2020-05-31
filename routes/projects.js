const router = require('express').Router();
let Project = require('../models/project.model');
let User = require('../models/user.model');
const authMiddleWare = require('../middleware/auth');

router.route('/').get(authMiddleWare, (req, res) => {
    Project.find()
        .then(projects => res.json(projects))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/:id').get(authMiddleWare, (req, res) =>{
    let data = {projects:[]};

    Project.find({administrator: req.params.id})
        .then(projects => res.json(projects))
        .catch(err => res.status(400).json('Error' + err));
    /*User.findById(req.params.id)
        .then(user => {
            for (let i = 0; i < data.projects.length; i++){
                data.projects[i].user = user;
            }

            //data.user = user;
            return res.json(data);
        })
        .catch(err => res.status(400).json('Error' + err));*/
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

router.route('/update/:id').post((req, res) => {
    Task.findById(req.params.id)
        .then(user => {
            user.name = req.body.name;
            user.description = req.body.description;
            user.administrator = req.body.admin;
            user.customer = req.body.customer;
            user.developers = req.body.developers;
            user.start_date = req.body.start_date;
            user.end_date = req.body.end_date;

            user.save()
                .then(() => res.json('Updated succesfully'))
                .catch( err => res.status(400).json('Error ' + err))
        })

});

router.route('/:name/devs').get(authMiddleWare, (req, res) =>{
    Project.find({name: req.params.name})
        .then(projects => res.json(projects[0].developers))
        .catch(err => res.status(400).json('Error' + err))
});

module.exports = router;