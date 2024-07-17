const express=require('express');
const router=express.Router();
const authentication=require('../controllers/authentication');
const masages=require('../controllers/masages');


router.post('/signup',authentication.signup);
router.post('/login',authentication.login);
router.post('/masagesave',masages.masageSave);
router.get('/masages',masages.allMasages)

module.exports=router;