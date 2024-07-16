const express=require('express');
const router=express.Router();
const authentication=require('../controllers/authentication')

router.post('/user/signup',authentication.signup);
router.post('/user/login',authentication.login)

module.exports=router;