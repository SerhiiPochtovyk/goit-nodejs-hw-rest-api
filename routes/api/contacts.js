import express from "express";
import ctrl from "../../controllers/contactControllers.js";
import isEmptyBody from "../../middlewares/isEmptyBody.js";

const contactsRouter = express.Router();

contactsRouter.get("/", ctrl.getAll);

contactsRouter.get("/:contactId", ctrl.getById);

contactsRouter.post("/", isEmptyBody, ctrl.createContact);

contactsRouter.put("/:contactId", isEmptyBody, ctrl.updateContact);

contactsRouter.delete("/:contactId", ctrl.deleteContact);

contactsRouter.patch("/:contactId/favorites", ctrl.addToFavorites);

export default contactsRouter;
