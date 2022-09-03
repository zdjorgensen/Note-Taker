const notes = require('express').Router();
const {readFromFile, readAndAppend} = require('../helpers/fs');
const uuid = require('../helpers/uuid');

notes.get('/', (req, res) => {
    readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    const { title, text } = req.body;
    console.log(req.body);

    if(req.body) {
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };
        
        readAndAppend(newNote, './db/notes.json');
        res.json(`Note created`);
    } else {
        res.error('Error in creating note');
    }
});

module.exports = notes;