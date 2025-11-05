const { signup } = require('../Controller/AuthController');
const { signupValidation } = require('../Middleware/AuthValidation');
const { login } = require('../Controller/AuthController');
const { loginValidation } = require('../Middleware/AuthValidation');

const router = require('express').Router();

router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);

module.exports = router;
