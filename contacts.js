const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

const contactsPath = path.join(__dirname, './db/contacts.json');

const readCotacts = async () => {
    try {
        const result = await fs.readFile(contactsPath, 'utf8');
        const contactsParse = JSON.parse(result);
        return contactsParse;
    } catch (error) {
        return console.error(error.message);
    }
};

function listContacts() {
    return readCotacts();
}

async function getContactById(contactId) {
    const contacts = await readCotacts();
    const result = contacts.filter(contact => contact.id === Number(contactId));
    return result;
   
}

async function removeContact(contactId) {
    const contacts = await readCotacts();
    const result = contacts.filter(contact => contact.id !== Number(contactId));
    await fs.writeFile(contactsPath, JSON.stringify(result, null, 2));
    return result;
}

async function addContact(name, email, phone) {
    const contacts = await readCotacts();
    const newContact = { id: crypto.randomUUID(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
};