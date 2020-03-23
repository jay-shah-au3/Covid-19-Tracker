const router = require('express').Router();

const casesController = require('../controllers/cases.controller');

router.get('/', casesController.getCases);

module.exports = router;