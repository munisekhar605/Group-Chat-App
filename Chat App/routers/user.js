const express=require('express');
const router=express.Router();
const authentication=require('../controllers/authentication');
const masages=require('../controllers/masages');
const userathontecation=require('../service/jwt')

router.post('/signup',authentication.signup);
router.post('/login',authentication.login);
router.post('/masagesave',userathontecation,masages.masageSave);
router.get('/masages/:masageid',userathontecation,masages.allMasages)

module.exports=router;