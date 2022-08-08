export async function selectNotes(connection) {
    return await new Promise((resolve, reject) => {
        connection.execute('SELECT n.notes_id, note, priority, style FROM todoapp.notes n LEFT JOIN todoapp.note_style ns ON n.notes_id = ns.notes_id ORDER BY priority DESC;', (err, rows) => {
            if (err) return reject(err);
            const notes = rows;
            console.log(notes)
            return resolve(notes);
        })
    })
}

export async function insertNote(connection, note, priority) {
    return await new Promise((resolve, reject) => {
        connection.execute('INSERT notes(note, priority) VALUES(?, ?)', [note, priority], (err, _) => {
            if (err) return reject(err);
            resolve();
        });
    });
}

export async function deleteNote(connection, notes_id) {
    return await new Promise((resolve, reject) => {
        connection.execute('DELETE FROM notes WHERE notes_id = ?', [notes_id], (err, _) => {
            if (err) return reject(err);
            resolve();
        });
    });
}

export async function updateNote(connection, notes_id, note) {
    return await new Promise((resolve, reject) => {
        connection.execute('UPDATE notes SET note=? WHERE notes_id=?', [note, notes_id], (err, _) => {
            if (err) return reject(err);
            resolve();
        });
    });
}