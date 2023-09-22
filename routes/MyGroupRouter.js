const express = require('express');
const router = express.Router();
const MyGroupController = require('../controllers/MyGroupController'); // Import controller

// Sử dụng router và controller phù hợp
router.get('/', MyGroupController.getIndex);
router.get('/message/:id', MyGroupController.getMessage);
router.get('/message', MyGroupController.getMessage);
router.get('/:MSSV/:id', MyGroupController.getMSSV);
router.post('/:MSSV/:id', MyGroupController.postMSSV);

module.exports = router;
