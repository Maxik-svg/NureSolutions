const router = require('express').Router();
let Project = require('../models/project.model');
let User = require('../models/user.model');
const authMiddleWare = require('../middleware/auth');

router.route('/').get(authMiddleWare, (req, res) => {
    Project.find()
        .then(projects => res.json(projects))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post(authMiddleWare, (req, res) => {

    const project_name = req.body.project_name;
    const project_description = req.body.project_description;
    const project_administrator = req.body.project_administrator;
    const project_customer = req.body.project_customer;
    const developers = req.body.developers;

    const NewProject = new Project({
        project_name,
        project_description,
        project_administrator,
        project_customer,
        developers,
    });

    NewProject.save()
        .then(() => res.json('Added Succesfully'))
        .catch(err => res.status(400).json('Error' + err));

});

module.exports = router;