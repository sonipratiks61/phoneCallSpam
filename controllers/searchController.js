const { User, Contact, SpamReport } = require('../models');
const { Op } = require('sequelize');

const {
    sendBadRequest,
    sendSuccess,
    sendNotFound,
    sendInternalError
  } = require("../util/customResponse");

  
   exports.searchByName= async (req, res) => {
        const { name } = req.query;
        try {
           
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

            const combinedResults = [...users, ...contacts].sort((a, b) => {
             
                const startsWithNameA = a.name.toLowerCase().startsWith(name.toLowerCase()) ? -1 : 1;
                const startsWithNameB = b.name.toLowerCase().startsWith(name.toLowerCase()) ? -1 : 1;
                return startsWithNameA - startsWithNameB || a.name.localeCompare(b.name);
            });

           return sendSuccess(res,'fetch Successfully',combinedResults)
        } catch (error) {
            console.error('Search by name error:', error);
           return sendInternalError(res, 'Failed to search by name.' );
        }
    },

    exports.searchByPhoneNumber = async (req, res) => {
        const { phoneNumber } = req.query;
        try {
            console.log(phoneNumber, 'phoneNumber');
    
            // Search in the User table
            const userResults = await User.findAll({
                where: { phoneNumber: phoneNumber },
                attributes: ['id', 'name', 'phoneNumber'],
                include: [{
                    model: SpamReport,
                    as: 'spamReports',
                    attributes: ['reportsCount'],
                }]
            });
    
            console.log(userResults, 'userResults');
    
            if (userResults.length === 0) {
                
                const contactResults = await Contact.findAll({
                    where: { phoneNumber: phoneNumber },
                    attributes: ['name', 'phoneNumber'],
                    include: [{
                        model: SpamReport,
                        as: 'spamReport',
                        attributes: ['reportsCount'],
                    }]
                });
    
                console.log(contactResults);
    
                return res.status(200).json({
                    success: true,
                    message: 'Successfully fetched contacts',
                    data: contactResults
                });
            } else {
                
                return res.status(200).json({
                    success: true,
                    message: 'Successfully fetched results',
                    data: userResults
                });
            }
        } catch (error) {
            console.error('Search by phone number error:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to search by phone number',
                error: error.message 
            });
        }
    };


