import wrapperAsync from "../decorators/controllerWrapper.js";
import contacts from "../models/contacts.js";
import { contactsValidation } from "../validations/contactsValidation.js";

const getAll = wrapperAsync(async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
});

const getById = wrapperAsync(async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json(result);
});

const createContact = wrapperAsync(async (req, res) => {
  const { error } = contactsValidation(req.body);
  if (error) {
    return res.status(400).json({
      message: `Missing required ${error.details[0].context.label} field`,
    });
  }
  const result = await contacts.addContact(req.body);
  res.json(result);
});

const deleteContact = wrapperAsync(async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (result) {
    res.status(200).json({ message: "Contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

const updateContact = wrapperAsync(async (req, res) => {
  const { error } = contactsValidation(req.body);
  if (error) {
    return res.status(400).json({
      message: `Missing ${error.details[0].context.label} fields`,
    });
  }
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  res.json(result);
});

const addToFavorites = wrapperAsync(async (req, res) => {
  const { contactId } = req.params;
  const { body } = req;
  const result = await contacts.updateContact(contactId, body);
  if (!result) {
    return res.status(400).json({ message: "Missing field favorite" });
  }

  return res.status(200).json(result);
});

export default {
  getAll,
  getById,
  createContact,
  deleteContact,
  updateContact,
  addToFavorites,
};
