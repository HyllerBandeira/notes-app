const yargs = require("yargs");
const chalk = require("chalk");
const notes = require("./notes.js");

const showErrorMessage = chalk.red.bold.inverse;
const showSuccessMessage = chalk.green.bold.inverse;
const showWarningMessage = chalk.yellow.bold.inverse;

// Add note command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: "Note's title",
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: "Note's body",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        try {
            notes.addNote(argv.title, argv.body)
            console.log(showSuccessMessage("Note successfully addeded"))
        } catch (err) {
            if (err === "DUPLICATED_TITLES")
                console.log(showWarningMessage("Note\'s title already taken"))
            else
                console.log(showErrorMessage("Note addition failed"))
        }
    }
});

// List note command
yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler() {
        try {
            notes.listNotes()
            console.log(showSuccessMessage("Note successfully listed"))
        } catch (err) {
            if (err === "NOT_FOUND")
                console.log(showWarningMessage("There\'s none note stored"))
            else
                console.log(showErrorMessage("Note listing failed"))
        }
    }
})

// Read note command
yargs.command({
    command: 'read',
    describe: 'Display given note',
    builder: {
        title: {
            description: "Node\'s title to read",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        try {
            notes.readNote(argv.title)
            console.log(showSuccessMessage("Note successfully readed"))
        } catch (err) {
            if (err === "NOT_FOUND")
                console.log(showWarningMessage("Note\'s title not found"))
            else
                console.log(showErrorMessage("Note listing failed"))
        }
    }
})

// Remove note command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            description: "Note\'s title to remove",
            demandOption: true,
            type: 'string'
        }
    }, 
    handler(argv) {
        try {
            notes.removeNote(argv.title)
            console.log(showSuccessMessage("Note successfully removed"))
        } catch (err) {
            if (err === "NOT_FOUND")
                console.log(showWarningMessage("Note\'s title not found"))
            else
                console.log(showErrorMessage("Note remove failed"))
        }
    }
})

yargs.parse()