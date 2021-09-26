const { Command } = require('commander');
const chalk = require('chalk');
const {listContacts,
    getContactById,
    removeContact,
    addContact} = require('./contacts');

const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
            listContacts().then(contacts => console.table(contacts))
            .catch(console.error);
        break;

        case 'get':
            getContactById(id).then(contact => {
                if (contact) {
                    console.log(chalk.green(`Contact ${id} found!`));
                    console.table(contact);
                } else {
                    console.log(chalk.red(`Contact ${id} not found!`));
                }
            }).catch(console.error);
        break;

        case 'add':
            addContact(name, email, phone).then(contact => {
                console.log(chalk.green(`${name} added`));
                console.table(contact);
            }).catch(console.error);
        break;

        case 'remove':
            removeContact(id).then(contact => {
                console.log(chalk.green('Contact removed'));
                console.table(contact);
            }).catch(console.error);
        break;

        default:
            console.warn(chalk.red('Unknown action type!'));
    }
};

invokeAction(argv);