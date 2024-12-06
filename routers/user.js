const express=require('express');
const router=express.Router();
const authentication=require('../controllers/authentication');
const masages=require('../controllers/masages');
const groups=require('../controllers/groups');
const userathontecation=require('../service/jwt');

router.post('/signup',authentication.signup);
router.post('/login',authentication.login);
router.post('/masagesave',userathontecation,masages.masageSave);
router.get('/masages/:masageid',userathontecation,masages.allMasages);
router.post('/groupscreate',userathontecation,groups.groupscreate);
router.get('/allgroups',userathontecation,groups.allgroups);
router.post('/ueseraddingroup',userathontecation,groups.ueseraddingroup);
module.exports=router;