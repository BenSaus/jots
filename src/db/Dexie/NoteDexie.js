import uuid from 'uuid/dist/v4'

const NoteDbDexie = (db) => {
    return {
        async getNotes () {
            return await db.notes.toArray()
        },
        async createNote (data) {
            // Creating a new note here to keep input parameters untouched
            const newNote = { ...data }
            newNote.id = uuid()

            // TODO: Try catch here???
            await db.notes.put(newNote)  
            return newNote
        },
        async updateNote (data) {
            await db.notes.where('id').equals(data.id).modify(data)
            return data.id
        },
        async deleteNote (id) {
            // ERROR!!!!!!!!  What if there is an error when calling the DB!!!!
            await db.notes.where('id').equals(id).delete()
            return id 
        }
    }
}

export default NoteDbDexie

