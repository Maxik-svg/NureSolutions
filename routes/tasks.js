const router = require('express').Router();
let Task = require('../models/task.model');

const middleAuth = require('../middleware/auth');

router.route('/').get((req, res) => {
    Task.find()
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post(middleAuth, (req, res) => {
    const name = req.body.name;
    const userId = req.body.userId;
    const description = req.body.description;
    const date_start = Date.parse(req.body.date_start);
    const date_end = Date.parse(req.body.date_end);
    const isCompleted = req.body.isCompleted;


    const NewTask = new Task({
        name,
        userId,
        description,
        date_start,
        date_end,
        isCompleted
    });


    NewTask.save()
        .then(() => res.json('Added Succesfully'))
        .catch(err => res.status(400).json('Error' + err));
});


router.route('/:id').get(middleAuth, (req, res) => {
   Task.findById(req.params.id)
       .then(exercise => res.json(exercise))
       .catch(err => res.status(400).json('Error' + err));
});

router.route('/:id').delete(middleAuth, (req, res) => {
   Task.findByIdAndDelete(req.params.id)
       .then(() => res.json('Task deleted'))
       .catch(err => res.status(400).json('Error' + err));
});

router.route('/update/:id').post(middleAuth, (req, res) => {
   Task.findById(req.params.id)
       .then(exercise => {
           exercise.name = req.body.name;
           exercise.userId = req.body.userId;
           exercise.description = req.body.description;
           exercise.date_start = Date.parse(req.body.date_start);
           exercise.date_end = Date.parse(req.body.date_end);
           exercise.isCompleted = req.body.isCompleted;

         exercise.save()
             .then(() => res.json('Updated succesfully'))
             .catch( err => res.status(400).json('Error ' + err))
       })

});

module.exports = router;