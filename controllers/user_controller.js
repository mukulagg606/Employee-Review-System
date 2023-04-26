const User = require('../models/user'); // requiring user

// creating the session, basically for logging In
module.exports.createSession = async function(req, res){
    // console.log(req.body);
    req.flash('success', 'You are logged In');
    return res.redirect('/');
}

