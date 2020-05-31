const router = require('express').Router();
let User = require('../models/user.model');
const authMiddleWare = require('../middleware/auth');
const bCrypt = require('bcrypt');

const auth = require('../auth');

router.route('/').get(authMiddleWare, (req, res) => {
   User.find()
       .then(users => res.json(users))
       .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/:id').get(authMiddleWare, (req, res) => {
   User.findById(req.params.id)
       .then(user => res.json(user))
       .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/register').post((req, res) => {

   const username = req.body.username;
   const login = req.body.login;
   const password = bCrypt.hashSync(req.body.password, 10);
   const email = req.body.email;

   const newUser = new User({
      username,
      login,
      password,
      email
   });

newUser.save()
    .then(() => res.json('Added Succesfully'))
    .catch(err => res.status(400).json('Error' + err))
});

router.route('/update/:id').post(authMiddleWare, (req, res) => {
   User.findById(req.params.id)
       .then(user => {
          user.username = req.body.username;
          user.login = req.body.login;
          user.password = bCrypt.hashSync(req.body.password, 10);
          user.email = req.body.email;

          user.save()
              .then(() => res.json('Updated succesfully'))
              .catch( err => res.status(400).json('Error ' + err))
       })

});

router.route('/login').post((req, res) => {

   const login = req.body.login;
   const password = req.body.password;

   auth.signIn(req, res);

});

router.route('/add').post(authMiddleWare, (req, res) => {

   const username = req.body.username;
   const NewUser = new User({username});

   NewUser.save()
       .then(() => res.json('user added !'))
       .catch(err => res.status(400).json('Error : ' + err));
});

module.exports = router;