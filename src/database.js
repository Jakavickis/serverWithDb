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

export async function lastInsertRow(connection) {
    return await new Promise((resolve, reject) => {
        connection.execute('SELECT id FROM last_insert_row;', (err, result) => {
            if (err) return reject(err);
            resolve(result[0].id);
        });
    });
}

export async function insertStyle(connection, notes_id, style) {
    return await new Promise((resolve, reject) => {
        connection.execute('INSERT todoapp.note_style(notes_id, style) VALUES(?, ?)', [notes_id, style], (err, result) => {
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