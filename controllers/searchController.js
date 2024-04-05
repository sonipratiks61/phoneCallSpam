const { User, Contact, SpamReport } = require('../models');
const { Op } = require('sequelize');


const searchController = {
    // Search by name
    searchByName: async (req, res) => {
        const { name } = req.query;
        console.log(name,"name")
        try {
            // Search both Users and Contacts for matching names
            const users = await User.findAll({
                where: { name: { [Op.iLike]: `%${name}%` } },
                attributes: ['id', 'name', 'phoneNumber'],
                include: [{
                    model: SpamReport,
                    as: 'spamReport',
                    attributes: ['reportsCount'],
                }]
            });

            const contacts = await Contact.findAll({
                where: { name: { [Op.iLike]: `%${name}%` } },
                attributes: ['name', 'phoneNumber'],
                include: [{
                    model: SpamReport,
                    as: 'spamReport',
                    attributes: ['reportsCount'],
                }]
            });

            // Combine and sort results
            const combinedResults = [...users, ...contacts].sort((a, b) => {
                // Sort by whether name starts with the query, then alphabetically
                const startsWithNameA = a.name.toLowerCase().startsWith(name.toLowerCase()) ? -1 : 1;
                const startsWithNameB = b.name.toLowerCase().startsWith(name.toLowerCase()) ? -1 : 1;
                return startsWithNameA - startsWithNameB || a.name.localeCompare(b.name);
            });

            res.json(combinedResults);
        } catch (error) {
            console.error('Search by name error:', error);
            res.status(500).json({ message: 'Failed to search by name.' });
        }
    },

    // Search by phone number
    searchByPhoneNumber: async (req, res) => {
        const { phoneNumber } = req.query;
        try {
            // Search both Users and Contacts for matching phone numbers
            const results = await User.findAll({
                where: { phoneNumber },
                attributes: ['id', 'name', 'phoneNumber'],
                include: [{
                  model: SpamReport,
                  as: 'spamReports', // Ensure that this alias matches the one defined in the association
                  attributes: ['reportsCount'],
                }]
              });

            if (results.length === 0) {
                // If no registered user is found, search in contacts
                const contactResults = await Contact.findAll({
                    where: { phoneNumber },
                    attributes: ['name', 'phoneNumber'],
                    include: [{
                        model: SpamReport,
                        as: 'spamReport',
                        attributes: ['reportsCount'],
                    }]
                });
                res.json(contactResults);
            } else {
                res.json(results);
            }
        } catch (error) {
            console.error('Search by phone number error:', error);
            res.status(500).json({ message: 'Failed to search by phone number.' });
        }
    },
};

module.exports = searchController;
