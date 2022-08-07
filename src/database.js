export async function getNotes(connection) {
    return await new Promise((resolve, reject) => {
        connection.execute('SELECT notes_id, note FROM todoapp.notes n;', (err, rows) => {
            if (err) return reject(err);

            const notes = rows;
            return resolve(notes);
        })
    })
}

export async function saveNotes(connection, note) {
    return await new Promise((resolve, reject) => {
        connection.execute('INSERT notes(note) VALUES(?)', [note], (err, _) => {
            if (err) return reject(err);
            resolve();
        });
    });
}

export async function deleteNoteById(connection, notes_id) {
    return await new Promise((resolve, reject) => {
        connection.execute('DELETE FROM notes WHERE notes_id = ?', [notes_id], (err, _) => {
            if (err) return reject(err);
            resolve();
        });
    });
}

export async function saveNoteChanges(connection, notes_id, note) {
    return await new Promise((resolve, reject) => {
        connection.execute('UPDATE notes SET note=? WHERE notes_id=?', [note, notes_id], (err, _) => {
            if (err) return reject(err);
            resolve();
        });
    });
}