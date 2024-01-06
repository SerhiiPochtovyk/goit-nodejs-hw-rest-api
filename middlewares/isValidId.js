import { isValidObjectId } from "mongoose";
import HttpError from "../helpers/httpError.js";

const isValidID = (req, res, next) => {
    const { contactId } = req.params;
    if (!isValidObjectId(contactId)) {
        return next(HttpError(404, `${contactId} not valid id`));
    }
    next();
};

export default isValidID;