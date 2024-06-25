const contactService = require('../services/contact');

const identifyContact = async (req, res) => {
  const { email, phoneNumber } = req.body;

  const contacts = await contactService.findContactsByEmailOrPhoneNumber(email, phoneNumber);

  if (contacts.length === 0) {
    const newContact = await contactService.createContact(email, phoneNumber, null, 'primary');
    return res.json({
      contact: {
        primaryContatctId: newContact.id,
        emails: [newContact.email],
        phoneNumbers: [newContact.phoneNumber],
        secondaryContactIds: [],
      },
    });
  }

  const primaryContact = contacts.find(contact => contact.linkPrecedence === 'primary') || contacts[0];
  const secondaryContacts = contacts.filter(contact => contact.linkPrecedence === 'secondary' && contact.id !== primaryContact.id);

  const emails = Array.from(new Set(contacts.map(contact => contact.email).filter(email => email)));
  const phoneNumbers = Array.from(new Set(contacts.map(contact => contact.phoneNumber).filter(phoneNumber => phoneNumber)));

  if (!emails.includes(email) || !phoneNumbers.includes(phoneNumber)) {
    const newContact = await contactService.createContact(email, phoneNumber, primaryContact.id, 'secondary');
    secondaryContacts.push(newContact);
  }

  return res.json({
    contact: {
      primaryContatctId: primaryContact.id,
      emails: emails,
      phoneNumbers: phoneNumbers,
      secondaryContactIds: secondaryContacts.map(contact => contact.id),
    },
  });
};

const getAllContacts = async (req, res) => {
  const contacts = await contactService.getAllContacts();
  res.json(contacts);
};

const getContactById = async (req, res) => {
  const contact = await contactService.getContactById(req.params.id);
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).send('Contact not found');
  }
};

module.exports = {
  identifyContact,
  getAllContacts,
  getContactById,
};
