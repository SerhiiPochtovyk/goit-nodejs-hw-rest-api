const express = require("express");
const {
  contactsValidation,
} = require("../../validations/contactsValidation.js");

const contacts = require("../../models/contacts.js");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    if (!contactId) {
      return res
        .status(400)
        .json({ message: "Missing contactId as parameter" });
    }
    const result = await contacts.getContactById(contactId);
    if (!result) {
      return res.status(404).json({ message: "Contact is not found" });
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactsValidation(req.body);
    if (error) {
      return res.status(400).json({
        message: `Missing required ${error.details[0].context.label} field`,
      });
    }
    const result = await contacts.addContact(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    if (!contactId) {
      return res
        .status(400)
        .json({ message: "Missing contactId as parameter" });
    }
    const result = await contacts.removeContact(contactId);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactsValidation(req.body);
    if (error) {
      return res.status(400).json({
        message: `Missing ${error.details[0].context.label} fields`,
      });
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;