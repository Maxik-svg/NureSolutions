const router = require('express').Router();
let Task = require('../models/task.model');
let User = require('../models/user.model');

const authMiddleWare = require('../middleware/auth');

router.route('/').get(authMiddleWare, (req, res) => {
    Task.find()
        .then(task => res.json(task))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post(authMiddleWare, (req, res) => {
    const name = req.body.name;
    const userId = req.body.userId;
    const description = req.body.description;
    const date_start = Date.parse(req.body.date_start);
    const date_end = Date.parse(req.body.date_end);
    const isCompleted = req.body.isCompleted;
    const projectId = req.body.projectId;


    const NewTask = new Task({
        name,
        userId,
        projectId,
        description,
        date_start,
        date_end,
        isCompleted
    });


    NewTask.save()
        .then(() => res.json('Added Succesfully'))
        .catch(err => res.status(400).json('Error' + err));
});


router.route('/info/:id').get(authMiddleWare, (req, res) => {
   Task.findById(req.params.id)
       .then(task => res.json(task))
       .catch(err => res.status(400).json('Error' + err));
});

router.route('/:id').delete(authMiddleWare, (req, res) => {
   Task.findByIdAndDelete(req.params.id)
       .then(() => res.json('Task deleted'))
       .catch(err => res.status(400).json('Error' + err));
});

router.route('/update/:id').post(authMiddleWare, (req, res) => {
   Task.findById(req.params.id)
       .then(task => {
           task.name = req.body.name;
           task.userId = req.body.userId;
           task.projectId = req.body.projectId;
           task.description = req.body.description;
           task.date_start = Date.parse(req.body.date_start);
           task.date_end = Date.parse(req.body.date_end);
           task.isCompleted = req.body.isCompleted;

         task.save()
             .then(() => res.json('Updated succesfully'))
             .catch( err => res.status(400).json('Error ' + err))
       })

});

router.route('/markAsDone/:id').post(authMiddleWare, (req, res) => {
    Task.findById(req.params.id)
        .then(task => {
            task.isCompleted = true;

            task.save()
                .then(() => res.json('task marked'))
                .catch( err => res.status(400).json('Error ' + err))
        })
});

module.exports = router;