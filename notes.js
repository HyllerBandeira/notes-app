const fs = require('fs')
const chalk = require('chalk')

const filename = "notes.txt"

// Add the note
const addNote = (title, body) => {
    try {
        console.log("Adding a note")
        let notes = loadNotes()

        // Get the duplicated titles
        let duplicated_title = notes.find((note) => note.title === title)

        // Check if has duplicated titles
        if (!duplicated_title) {
            // Has no duplicated titles
            let new_note = {title: title, body: body}
            notes.push(new_note)
            saveNotes(notes)
        } else {
            // Has duplicated title
            throw "DUPLICATED_TITLES"
        }
    } catch (err) {
        if (err === "DUPLICATED_TITLES")
            throw "DUPLICATED_TITLES"
        else
            throw "Error"
    }
}

// Get the notes list
const getNotes = () => "Your notes..."


// List all the notes
const listNotes = () => {
    try {
        console.log("Retriving all the notes...")
        let notes = loadNotes()

        if (notes.length <= 0) 
            throw 'NOT_FOUND'
        
        console.log("\nNotes list\n")
        
        notes.forEach((note) => console.log(note.title))

        console.log("\nEnd of the list\n")
    } catch (err) {
        if (err === "NOT_FOUND")
            throw 'NOT_FOUND'
        else
            throw "Error"
    }
}

// Load a notes array
const loadNotes = () => {
    try {
        console.log("Loading the saved notes...")
        let fileBuffer = fs.readFileSync(filename)
        let json_data = fileBuffer.toString()
        let data = JSON.parse(json_data)

        return data;
    } catch (err) {
        return []
    }
}

// Read note from the file
const readNote = (title) => {
    try {
        console.log("Displaying the note...")
        
        let notes = loadNotes()

        // attempt to find a note with the given title. And remove then from the list
        console.log("Searching the note...")
        let note = notes.find((note) => (note.title === title))

        if (!note) 
            throw 'NOT_FOUND'
        
        console.log("\nNote\'s begining\n")
    
        console.log(chalk.inverse("\t"+note.title+"\t"))
        console.log("\t"+note.body)

        console.log("\nNote\'s end\n")
    } catch (err) {
        if (err === "NOT_FOUND")
            throw 'NOT_FOUND'
        else
            throw "Error"
    }
}

// Remove the notes from the file
const removeNote = (title) => {
    try {
        console.log("Removing the note...")
        
        let notes = loadNotes()

        // attempt to find a note with the given title. And remove then from the list
        console.log("Searching the note...")
        let notes_to_keep = notes.filter((note) => (note.title !== title))

        if (notes.length === notes_to_keep.length) 
            throw 'NOT_FOUND'
        else {
            console.log("Detaching the note...")
            saveNotes(notes_to_keep)
        }
    } catch (err) {
        if (err === "NOT_FOUND")
            throw 'NOT_FOUND'
        else
            throw "Error"
    }
}

// Store the notes at a file
const saveNotes = (notes) => {
    try {
        console.log("Saving the notes...")
        let json_data = JSON.stringify(notes)
        let fileBuffer = fs.writeFileSync(filename, json_data)
    } catch (err) {
        throw "Error"
    }
}

module.exports = {
    addNote,
    listNotes,
    readNote,
    removeNote,
}