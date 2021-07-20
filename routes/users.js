const express = require('express');
const router = express.Router();
const {
    signIn,
    signUp,
    getUsers,
    getUser
} = require('../controllers/users');


router.post('/sign-in',signIn)
router.post('/sign-up',signUp)
router.get('/users',getUsers)
router.get('/user/:id',getUser)



module.exports = router;





