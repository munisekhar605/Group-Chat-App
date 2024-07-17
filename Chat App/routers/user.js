const express=require('express');
const router=express.Router();
const authentication=require('../controllers/authentication');
const masages=require('../controllers/masages');

router.post('/masagesave',masages.masageSave)
router.post('/signup',authentication.signup);
router.post('/login',authentication.login);

module.exports=router;