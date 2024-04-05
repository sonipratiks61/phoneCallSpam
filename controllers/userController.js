const { User,Contact } = require('../models');


 exports.getProfile=async (req, res) => {
    try {
        const user = req.query; 
        console.log(user,"user :")
        // console.log(req,"req :")
        const userProfile = await User.findOne({ phoneNumber: user.phoneNumber });
        if (!userProfile) {
            return res.status(404).json({ message: "User profile not found" });
        }
        userProfile.password = undefined;
        // Return the user profile
        return res.status(200).json(userProfile);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

exports.addContact = async (req, res) => {
    try {
        const userId = req.userId;
      
        const contactsData = req.body;
        const invalidContacts = contactsData.filter(contact => !contact.name || !contact.phoneNumber);
        if (invalidContacts.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Name and phone number are required for all contacts."
            });
        }

       
        const contacts = await Contact.bulkCreate(contactsData.map(contact => ({
            name: contact.name,
            phoneNumber: contact.phoneNumber,
            email: contact.email,
            userId: userId
        })));
        res.status(200).json({ message: 'Contacts added successfully', contacts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.updateContact=async (req, res) => {
    try {
      const { contactId } = req.params;
      const { name, phoneNumber, email } = req.body;

      const contact = await Contact.findOne({
        where: { id: contactId, userId: req.userId },
      });
console.log(contact,'contact')
      if (!contact) {
        return res.status(404).json({ message: 'Contact not found.' });
      }

      await contact.update({ name, phoneNumber, email });

      await contact.save();

      res.status(200).json({message:"Update Successfully",data:contact});
    } catch (error) {
      console.error('Error updating contact:', error);
      res.status(500).json({ message: 'Failed to update contact.' });
    }
}

exports.deleteContactById= async (req, res) => {
    try {
      const { contactId } = req.params;

      const result = await Contact.destroy({
        where: { id: contactId, userId: req.userId },
      });

      if (result === 0) {
        return res.status(404).json({ message: 'Contact not found or not authorized to delete.' });
      }

      res.status(200).json({success:true,message:'Delete Successfully'});
    } catch (error) {
      console.error('Error deleting contact:', error);
      res.status(500).json({ message: 'Failed to delete contact.' });
    }
}