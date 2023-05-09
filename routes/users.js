const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken')

const respondFailure = (res, code, msg) => {
    res.status(code).json({"msg": msg})
}


/* GET users listing. */
router.post('/login', async (req, res) => {
    if (!(req.body.mail && req.body.password))
        return respondFailure(res, 400, 'All Fields are Required');
    let user;
    try {
        user = await User.findOne({mail: req.body.mail}).exec();
        let token = jwt.sign({
            _id: user._id,
            email: user.mail,
        }, 'ThisIsSecret', {expiresIn: "1d"});
        return res.status(200).json(token);
    } catch (e){
        return respondFailure(res, 404, 'user not found');
    }
});

router.post('/signup', async (req, res) => {
    if (!(req.body.name && req.body.mail && req.body.password))
        respondFailure(res, 400, 'All Fields are Required');
    let user;
    try {
        user = await User.create(req.body);
        let token = jwt.sign({
            _id: user._id,
            email: user.mail,
        }, 'ThisIsSecret', {expiresIn: "1d"});
        res.status(200).json(token);
    } catch (e){
        respondFailure(res, 400, 'user already existed');
    }
})

module.exports = router;
