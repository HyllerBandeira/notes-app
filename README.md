# notes-app
Node.js app to control notes. It's a prompt app, and the main goal it's for exercise.

# dependencies
To run this app, you need `node.js`, if you do not have it in your computer, install from <a href="https://nodejs.org/en/download/">here</a>.

# setting things up
To run this app, open the app root path `notes-app` in your prompt, and run `npm install` command to install all npm modules necessary

# running the app
To run this app, just open the app's root path and use de command `node app.js [comand] <attributes>`. To get greater information run `node app.js --help`

# command avaliable
Comand: add
  Add a new note 
  atributes:
    title: string|required,
    body: string|required
    
Comand: list
  List all notes, by title
  
Comand: read
  Display a note
  atributes:
    title: string|required
  
Comand: remove
  Remove a note
  atributes:
    title: string|required,
    
