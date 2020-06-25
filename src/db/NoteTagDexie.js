import uuid from 'uuid/dist/v4'

const NoteTagDbDexie = {
    // async getTag (context, id) {
    //     const { db } = context
    //     return resp.tags_by_pk
    // },
    async getNoteTags (context) {
        const { db } = context
        return await db.noteTags.toArray()
    },
    async createNoteTag (context, data) {
        const { db } = context

        // Copy the tag to Keep input parameters untouched
        const newNoteTag = { ...data }
        newNoteTag.id = uuid()

        await db.noteTags.put(newNoteTag)
        return newNoteTag
    },
    async updateNoteTag (context, data) {
        const { db } = context
        
        await db.noteTags.where('id').equals(data.id).modify(data)
        return data.id
    },
    async deleteNoteTag (context, id) {
        const { db } = context

        await db.noteTags.where('id').equals(id).delete()
        return id
    }
}

export default NoteTagDbDexie