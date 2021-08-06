const express = require('express');
const { logUser } = require('../controllers/useController');

const router = express.Router();

//* @desc Auth user/Get Token
//* @route GET api/v1/users/login
//* @access Public

router.get('/', logUser);

module.exports = router;
