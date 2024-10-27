require('dotenv').config();
const express= require('express')
const router=express()
const user= require('../controller/user.controller') 
const Property= require('../controller/property.controller') 
const {login_required}= require('../middleware/index')


//users routes
router.post('/api/signup', user.signup);
router.post('/api/signin', user.signin)
router.get('/api/logout', login_required, user.logout) 
router.get('/api/profile_details/:id', login_required, user.profileDetails)
router.put('/api/update_details/:id', login_required, user.updateDetails)  
router.get('/api/allUsers', user.allUsers)


//property
router.post('/api/addproperty', Property.addProperty)
router.put('/api/update_property/:id', login_required, Property.updatePropertyDetails)
router.put('/api/delete_property_Details/:id', login_required, Property.deletePropertyDetails)
router.get('/api/getall_property', Property.getAllProperties)
router.get('/api/propertyDetails/:id', Property.propertyDetails)
router.get('/api/searchproperty', Property.searchProperty)

module.exports = router;
