const express = require('express');
const router = express.Router();

const ctrl = require('../../controllers/contacts');
const validateBody = require('../../middlewares/validateBody');
const checkBody = require('../../middlewares/checkBody');
const isValidId = require('../../middlewares/isValidId');
const authenticate = require('../../middlewares/authenticate');
const schemas = require('../../models/contact');

router.use(authenticate);

router.get('/', ctrl.listContacts);
router.get('/:id', isValidId, ctrl.getContactById);
router.post('/', checkBody, validateBody(schemas.addSchema), ctrl.addContact);
router.delete('/:id', isValidId, ctrl.removeContact);
router.put('/:id', isValidId, checkBody, validateBody(schemas.addSchema), ctrl.updateContact);
router.patch('/:id/favorite', isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateStatusContact);

module.exports = router;
