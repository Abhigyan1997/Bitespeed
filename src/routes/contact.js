const express = require('express');
const { identifyContact, getAllContacts, getContactById } = require('../controllers/contact');

const router = express.Router();

router.post('/identify', identifyContact);
router.get('/contacts', getAllContacts);
router.get('/contacts/:id', getContactById);

module.exports = router;
