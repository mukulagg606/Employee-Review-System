const express = require('express'); // requiring expresss
const router = express.Router(); // router

// all the request with the suffix /user, will require the user file, to compute
router.use('/users' , require('./users'));

module.exports = router;