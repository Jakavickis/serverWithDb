import { connect } from "./connect.js";
import { getNotes, saveNotes, saveNoteChanges, deleteNoteById } from "./database.js"

export function renderMainPage(req, res) {
    const model = {};
    model.title = 'My To-do App';

    const connection = connect();

    Promise.resolve()
        .then(_ => getNotes(connection))
        .then(notes => ({ ...model, notes }))
        .then(model => res.render('index', { model }))
        .catch(err => {
            console.log(err)
            res.render('error', { model: { errorName: err.name, message: err.message, stack: err.stack } });
        });
}

export function insertNewNote(req, res) {
    const newNote = req.body.note;
    const model = {};
    model.title = 'My To-do App';
    const connection = connect();
    Promise.resolve()
        .then(_ => saveNotes(connection, newNote))
        .then(_ => res.redirect('/'))
        .catch(err => {
            console.log(err)
            res.render('error', { model: { errorName: err.name, message: err.message, stack: err.stack } });
        });
}

export function deleteNote(req, res) {
    const id = req.query.id;
    const connection = connect();
    Promise.resolve()
        .then(_ => deleteNoteById(connection, id))
        .then(_ => res.redirect(303, '/'))
        .catch(err => {
            console.log(err);
            res.render('error', { model: { errorName: err.name, message: err.message, stack: err.stack } });
        });
}

export function editNote(req, res) {
    const id = req.body.id;
    const note = req.body.note;
    Promise.resolve()
        .then(_ => saveNoteChanges(connect(), id, note))
        .then(_ => res.status(200).send())
        .catch(_ => res.status(400).send())
}