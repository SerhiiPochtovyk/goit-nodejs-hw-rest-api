const express = require("express");
const { contactsValidation } = require("../../validations/contactsValidation.js");

const contacts = require("../../models/contacts.js");
const router = express.Router();

const catchError = (handler) => async (req, res, next) => {
  try {
    await handler(req, res, next);
  } catch (error) {
    next(error);
  }
};

const listContacts = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  if (!contactId) {
    res.status(400).json({ message: "Missing contactId as parameter" });
    return;
  }
  const result = await contacts.getContactById(contactId);
  if (!result) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const { body } = req;

  if (!body) {
    res.status(400).json({ message: "Missing request body" });
    return;
  }

  const { error } = contactsValidation(body);
  if (error) {
    res.status(400).json({
      message: `Missing required ${error.details[0].context.label} field`,
    });
    return;
  }

  const result = await contacts.addContact(body);
  res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  if (!contactId) {
    res.status(400).json({ message: "Missing contactId as parameter" });
    return;
  }

  const result = await contacts.removeContact(contactId);

  if (!result) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  res.json({ message: "Contact deleted" });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { body } = req;

  if (!body) {
    res.status(400).json({ message: "Missing fields" });
    return;
  }

  const { error } = contactsValidation(body);
  if (error) {
    res.status(400).json({
      message: `Missing ${error.details[0].context.label} fields`,
    });
    return;
  }

  const result = await contacts.updateContact(contactId, body);

  if (!result) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  res.json(result);
};

router.get("/", catchError(listContacts));
router.get("/:contactId", catchError(getContactById));
router.post("/", catchError(addContact));
router.delete("/:contactId", catchError(removeContact));
router.put("/:contactId", catchError(updateContact));

module.exports = router;
