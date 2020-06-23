import uuid from 'uuid/dist/v4'

const NoteDbDexie = {
    async getNotes (context) {
        const { db } = context
        return await db.notes.toArray()
    },
    // async getNote (context, id) {
    //     const { request } = context
    //     return resp.notes_by_pk
    // },
    async createNote (context, data) {
        const { db } = context

        // Creating a new note here to keep input parameters untouched
        const newNote = { ...data }
        newNote.id = uuid()

        // TODO: Try catch here???
        await db.notes.put(newNote)  
        return newNote
    },
    async updateNote (context, data) {
        const { db } = context

        // // Find differences between originalNote and note

        // // If there are differences

        //     // create update payload
        //     const updatePayload = {
        //         id: this.note.id,
        //         updates: {
        //             // diffs here
        //         }
        //     }

        //     // save the updated note
        //      await db.notes.where('id').equals(payload.id).modify(payload.updates)

        // WARNING: Currently the whole object is sent as an update.
        //              This could be very inefficient if the object is large
        //              Instead send only the updated values as outlined above

        // TODO: try catch here??
        await db.notes.where('id').equals(data.id).modify(data)
        return data.id
    },
    
    async deleteNote (context, id) {
        const { db } = context
        // ERROR!!!!!!!!  What if there is an error when calling the DB!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        
        // TODO: try catch here??
        await db.notes.where('id').equals(id).delete()
        return id 
    }

}

export default NoteDbDexie

