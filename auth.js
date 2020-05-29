const mongoose = require('mongoose');
const bCrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const User = require('./models/user.model');

const secret = 'kolomoitsev228';

const signIn = (req, res) => {
    const {login, password} = req.body;
    User.findOne({login})
        .then(
            (user) => {
                if (!user) {
                    res.status(401).json({message: "User not found"});
                }
                const isValid = bCrypt.compareSync(password, user.password);


                 if (isValid) {
                     const token = jwt.sign(user._id.toString(), secret)
                     res.json({
                         token,
                         id: user._id,
                     });
                }
                else{
                    res.status(401).json({message: "Invalid credentials"})
                }
             }
        )
        .catch(err => res.status(500).json({message: err.message}))
}

module.exports = {
    signIn,
}