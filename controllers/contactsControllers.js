const errorDecorator = require("./errorDecorator");
const { contactsValidation } = require("../../validations/contactsValidation.js");
const contacts = require("../../models/contacts.js");

const listContacts = async (req, res) => {
    const result = await contacts.listContacts();
    res.json(result);
};

const getContactById = async (req, res) => {
    const { contactId } = req.params;
    if (!contactId) {
        throw new Error("Missing contactId as parameter");
    }
    const result = await contacts.getContactById(contactId);
    if (!result) {
        throw new Error("Not found");
    }
    res.json(result);
};

const addContact = async (req, res) => {
    const { body } = req;

    if (!body) {
        throw new Error("Missing request body");
    }

    const { error } = contactsValidation(body);
    if (error) {
        throw new Error(`Missing required ${error.details[0].context.label} field`);
    }

    const result = await contacts.addContact(body);
    res.status(201).json(result);
};

const removeContact = async (req, res) => {
    const { contactId } = req.params;
    if (!contactId) {
        throw new Error("Missing contactId as parameter");
    }

    const result = await contacts.removeContact(contactId);

    if (!result) {
        throw new Error("Not found");
    }

    res.json({ message: "Contact deleted" });
};

const updateContact = async (req, res) => {
    const { contactId } = req.params;
    const { body } = req;

    if (!body) {
        throw new Error("Missing fields");
    }

    const { error } = contactsValidation(body);
    if (error) {
        throw new Error(`Missing ${error.details[0].context.label} fields`);
    }

    const result = await contacts.updateContact(contactId, body);

    if (!result) {
        throw new Error("Not found");
    }

    res.json(result);
};

module.exports = {
    listContacts: errorDecorator(listContacts),
    getContactById: errorDecorator(getContactById),
    addContact: errorDecorator(addContact),
    removeContact: errorDecorator(removeContact),
    updateContact: errorDecorator(updateContact),
};
