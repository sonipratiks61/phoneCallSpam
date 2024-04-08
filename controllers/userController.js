const { User, Contact } = require("../models");

const {
  sendBadRequest,
  sendSuccess,
  sendNotFound,
  sendInternalError
} = require("../util/customResponse");
exports.getProfile = async (req, res) => {
  try {
    const user = req.userId;
    const userProfile = await User.findOne({ phoneNumber: user.phoneNumber });
    if (!userProfile) {
      return sendNotFound(res, "User not found");
    }
    return sendSuccess(
      res,
      "User profile successfully retrieved.",
      userProfile
    );
  } catch (error) {
    return sendInternalError(res, "Internal server error");
  }
};

exports.addContact = async (req, res) => {
  try {
    const userId = req.userId;
    const contactsData = req.body;

    try {
      const contacts = await Contact.bulkCreate(
        contactsData.map((contact) => ({
          name: contact.name,
          phoneNumber: contact.phoneNumber,
          email: contact.email,
          userId: userId
        }))
      );

      return sendSuccess(res, "Contacts added successfully", contacts);
    } catch (error) {
      return sendBadRequest(res, error.message);
    }
  } catch (error) {
    return sendInternalError(res, "Internal server error");
  }
};

exports.updateContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    const { name, phoneNumber, email } = req.body;
    try {
      const contact = await Contact.findOne({
        where: { id: contactId, userId: req.userId }
      });

      if (!contact) {
        return sendNotFound(res, "Contact not found.");
      }

      await contact.update({ name, phoneNumber, email });

      return sendSuccess(res, "Update Successfully", contact);
    } catch (error) {
      return sendBadRequest(res, error.message);
    }
  } catch (error) {
    console.error("Error updating contact:", error);
    return sendInternalError(res, "Internal server error");
  }
};

exports.deleteContactById = async (req, res) => {
  try {
    const { contactId } = req.params;
    try {
      const result = await Contact.destroy({
        where: { id: contactId, userId: req.userId }
      });

      if (result === 0) {
        return sendNotFound(
          res,
          "Contact not found or not authorized to delete."
        );
      }

      return sendSuccess(res, "Delete Successfully");
    } catch (error) {
      return sendBadRequest(res, error.message);
    }
  } catch (error) {
    return sendInternalError(res, "Failed to delete contact.");
  }
};
