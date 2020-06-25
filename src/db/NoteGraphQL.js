import util from './dbUtils'
import uuid from 'uuid/dist/v4'

const endpointUrl = 'http://192.168.1.10:9002/v1/graphql'

const NoteDb = {    
    async getNotes (context) {
        const { request } = context
        const query = `
            query {
                notes {
                    id
                    title
                    text
                    color
                    state
                    created_at
                    updated_at
                    note_tags {
                        tag {
                            id
                        }
                    }
                }
            }
        `

        const resp = await request(
            endpointUrl,
            query
        )
        console.log(resp)
    
        const denormNotes = resp.notes.map(note => this._denormalizeNote(note))
        console.log(denormNotes)
        
        return denormNotes
    },
    _denormalizeNote (note) {
        const denormNote = { ...note }
        delete denormNote.note_tags

        denormNote.tags = note.note_tags.map(noteTag => noteTag.tag.id)
        return denormNote
    },

    async createNote (context, data) {
        console.log('Create Note graphql')
        console.log(data)
        const noteAndTags = this._processNote(data)
        console.log(noteAndTags)

        await this._createProcessedNote(context, noteAndTags.note)
        
        for (const tag of noteAndTags.tags) {
            await this._createNoteTag(context, tag)
        }
    },
    async _createNoteTag (context, data) {
        console.log('Create Note Tag')  
        console.log(data)
        
        const { request } = context
        const query = `
            mutation insert_note_tag(
                $id: uuid!, 
                $note_id: uuid!,
                $tag_id: uuid!, 
                $created_at: timestamptz,
                $updated_at: timestamptz,
            ) {
                insert_note_tag(objects: {
                    id: $id, 
                    note_id: $note_id,
                    tag_id: $tag_id,
                    created_at: $created_at,
                    updated_at: $updated_at
                }) {
                    returning {
                        id
                        note_id
                        tag_id
                        created_at
                        updated_at
                    }
                }
            }
        `

        const resp = await request(endpointUrl, query, data)
        // WARNING: Assumes only one product is being created
        return resp.insert_note_tag.returning[0]
    },

    async _createProcessedNote (context, data) {    
        const { request } = context
        const query = `
            mutation insert_notes(
                $id: uuid!, 
                $title: String!, 
                $text: String, 
                $color: String, 
                $state: enum_notes_state!, 
                $created_at: timestamptz,
                $updated_at: timestamptz,
            ) {
                insert_notes(objects: {
                    id: $id, 
                    title: $title, 
                    text: $text
                    color: $color, 
                    state: $state, 
                    created_at: $created_at,
                    updated_at: $updated_at
                }) {
                    returning {
                        id
                        title
                        text
                        color
                        state
                    }
                }
            }
        `

        const resp = await request(endpointUrl, query, data)
        // WARNING: Assumes only one product is being created
        return resp.insert_notes.returning[0]
    },
    _processNote (data) {
        const timestampedNote = this._addNewTimestamps(data)
        console.log(timestampedNote)
        const noEmptyNote = util.convertEmptyStringsToNulls(timestampedNote)
        noEmptyNote.id = uuid()
        
        const normalized = this._normalizeNote(noEmptyNote)
        console.log(normalized)

        return normalized 
    },
    _addNewTimestamps (data) {
        const newData = { ...data }
        const date = new Date(Date.now())
        newData.created_at = date.toISOString()
        newData.updated_at = date.toISOString()
        return newData
    },
    _normalizeNote (note) {
        const normNote = { ...note }
        delete normNote.tags
        
        const tags = this._createNormalizedTags(note.tags, note.id) 
        return { note: normNote, tags }
    },
    _createNormalizedTags (tags, noteid) {
        return tags.map(tag => {
            return this._addNewTimestamps({
                note_id: noteid,
                tag_id: tag,
                id: uuid()
            })
        }) 
    },

    async updateNote (context, data) {
        const { request } = context

        console.log('updateNote')
        console.log(data)
        const timestampedNote = this._addUpdateTimestamps(data)
        console.log(timestampedNote)
       
        delete timestampedNote.tags

        const query = `
            mutation update_notes (
                $id: uuid!,
                $title: String!, 
                $text: String, 
                $color: String, 
                $state: enum_notes_state!,
                $updated_at: timestamptz! 
            ) {
                update_notes (_set: {
                    title: $title,
                    text: $text,
                    color: $color,
                    state: $state,
                    updated_at: $updated_at,
                }, where: {id: {_eq: $id}}) {
                    affected_rows
                    returning {
                        id
                    }
                }
            }
        `

        // NOTICE: If affected_rows > 1 then we have an error

        const params = util.convertEmptyStringsToNulls(timestampedNote)
        const resp = await request(
            endpointUrl,
            query,
            params
        )

        return resp.update_notes.returning[0].id
    },
    _addUpdateTimestamps (data) {
        const updatedNote = { ...data }
        const date = new Date(Date.now())
        updatedNote.updated_at = date.toISOString()
        delete updatedNote.created_at

        return updatedNote
    },
    async deleteNote (context, id) {
        const { request } = context
        const query = `
            mutation delete_notes($id: uuid!) {
                delete_notes(where: {id: {_eq: $id}}) {
                    affected_rows
                    returning {
                        id
                    }
                }
            }
        `

        // NOTICE: If affected_rows > 1 then we have an error
        
        const resp = await request(
            endpointUrl,
            query,
            { id }
        )
        return resp.delete_notes.returning[0].id
    }

}

export default NoteDb

