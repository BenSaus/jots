import uuid from 'uuid/dist/v4'

const NoteTagDbDexie = (db) => {
    return {
        async getNoteTags () {
            return await db.noteTags.toArray()
        },
        async createNoteTag (data) {
            // Copy the tag to Keep input parameters untouched
            const newNoteTag = { ...data }
            newNoteTag.id = uuid()

            console.log('createNoteTag')
            console.log(newNoteTag)
    
            await db.noteTags.put(newNoteTag)
            return newNoteTag
        },
        async updateNoteTag (data) {
            await db.noteTags.where('id').equals(data.id).modify(data)
            return data.id
        },
        async deleteNoteTag (noteTag) {
            console.log('deleteNoteTag')
            console.log(noteTag)
            console.log(db.noteTags)
            // console.log()  // .where('tag_id').equals(noteTag.tag_id).delete()?
            await db.noteTags.where({ note_id: noteTag.note_id, tag_id: noteTag.tag_id }).delete()
            return noteTag
        }
    }
}

export default NoteTagDbDexie