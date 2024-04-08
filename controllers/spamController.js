const { SpamReport } = require("../models");
const {
  sendSuccess,
  sendInternalError,
  sendNotFound
} = require("../util/customResponse");

exports.reportSpam = async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    let spamReport = await SpamReport.findOne({ where: { phoneNumber } });

    if (spamReport) {
      spamReport.reportsCount += 1;
      spamReport.userId = req.userId;
      await spamReport.save();
    } else {
      spamReport = await SpamReport.create({
        phoneNumber,
        reportsCount: 1,
        userId: req.userId
      });
    }

    return sendSuccess(res, "Spam report successful", spamReport);
  } catch (error) {
    console.error("Error reporting spam:", error);
    return sendInternalError(res, "Failed to report spam.");
  }
};

exports.getSpamReport = async (req, res) => {
  try {
    const { phoneNumber } = req.params;

    const spamReport = await SpamReport.findOne({
      where: { phoneNumber: phoneNumber },
      attributes: ["phoneNumber", "reportsCount"]
    });

    if (!spamReport) {
      return sendNotFound(res, "No spam reports found for this phone number.");
    }

    res.json(spamReport);
  } catch (error) {
    console.error("Error getting spam report:", error);
    return sendInternalError(res, "Failed to get spam report.");
  }
};
