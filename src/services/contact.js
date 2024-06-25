const { Op } = require('sequelize');
const Contact = require('../models/contact');

const findContactsByEmailOrPhoneNumber = async (email, phoneNumber) => {
  return await Contact.findAll({
    where: {
      [Op.or]: [{ email }, { phoneNumber }],
    },
  });
};

const createContact = async (email, phoneNumber, linkedId, linkPrecedence) => {
  return await Contact.create({
    email,
    phoneNumber,
    linkedId,
    linkPrecedence,
  });
};

const getAllContacts = async () => {
  return await Contact.findAll();
};

const getContactById = async (id) => {
  return await Contact.findByPk(id);
};

module.exports = {
  findContactsByEmailOrPhoneNumber,
  createContact,
  getAllContacts,
  getContactById,
};
