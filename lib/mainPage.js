import mysql from 'mysql2';

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

function connect() {
    return mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'todoapp',
        password: 'bit',
        database: 'todoapp'
    });
}

async function getNotes(connection) {
    return await new Promise((resolve, reject) => {
        connection.execute('SELECT notes_id, note FROM todoapp.notes n;', (err, rows) => {
            if (err) return reject(err);

            const notes = rows;
            return resolve(notes);
        })
    })
}

async function saveNotes(connection, note) {
    return await new Promise((resolve, reject) => {
        connection.execute('INSERT notes(note) VALUES(?)', [note], (err, _) => {
            if (err) return reject(err);
            resolve();
        });
    });
}

async function deleteNoteById(connection, notes_id) {
    return await new Promise((resolve, reject) => {
        connection.execute('DELETE FROM notes WHERE notes_id = ?', [notes_id], (err, _) => {
            if (err) return reject(err);
            resolve();

        });
    });
}
