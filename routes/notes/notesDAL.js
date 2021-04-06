module.exports = db => {
    const createNote = async (title, body) => {
        const { id } = await db.one(
            "INSERT INTO notes (title, body) VALUES ($1, $2) RETURNING id",
            [title, body]
        )

        return {id, title, body}
    }

    const getAllNotes = () => {
        return  db.manyOrNone(
            "SELECT id, title, body FROM notes"
        )
    }

    const updateNote = (id, title, body) => {
        return db.one(
            "UPDATE notes SET title=$1, body=$2 WHERE id=$3 RETURNING id, title, body",
            [title, body, id]
        )
    }

    const deleteNote = id => {
        return db.query(
            "DELETE FROM notes WHERE id=$1",
            [id]
        )
    }

    return { createNote, getAllNotes, updateNote, deleteNote }
}