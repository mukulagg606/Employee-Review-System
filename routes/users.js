const express = require('express'); // requiring express
// requring the router form express
const router = express.Router();
// requiring passport, for authorization ,and authentication
const passport = require('passport');

// requiring userController
const userController = require('../controllers/user_controller');

// It will create new seeion for the particular user, and also it chaeck the authorization
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), userController.createSession);

module.exports = router;
