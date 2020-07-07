import dbUtil from '../dbUtils'
import uuid from 'uuid/dist/v4'

// TODO: Inject this instead for testing
import request from 'graphql-request'
import config from '../../config'

const endpointUrl = config.graphqlEndpoint

const NoteDb = {    
    async getNotes () {
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
                }
            }
        `
        
        const resp = await request(
            endpointUrl,
            query
        )

    
        return resp.notes
    },
    async createNote (data) {
        console.log('Create Note graphql')
        console.log(data)
        const processedNote = this._processNote(data)
        console.log(processedNote)

        return await this._createProcessedNote(processedNote)
    },
    _processNote (data) {
        const timestampedNote = dbUtil.addNewTimestamps(data)
        console.log(timestampedNote)
        const noEmptyNote = dbUtil.convertEmptyStringsToNulls(timestampedNote)
        noEmptyNote.id = uuid()

        return noEmptyNote 
    },
    async _createProcessedNote (data) {    
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
                        updated_at
                        created_at
                    }
                }
            }
        `

        const resp = await request(endpointUrl, query, data)
        // WARNING: Assumes only one product is being created
        return resp.insert_notes.returning[0]
    },
    async updateNote (data) {
        console.log('updateNote')
        console.log(data)
        const timestampedNote = dbUtil.addUpdateTimestamps(data)
        console.log(timestampedNote)

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

        const params = dbUtil.convertEmptyStringsToNulls(timestampedNote)
        const resp = await request(
            endpointUrl,
            query,
            params
        )

        return resp.update_notes.returning[0].id
    },
    async deleteNote (id) {
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
    },
    async deleteAll () {
        const query = `
            mutation {
                delete_notes(where: {}) {
                    affected_rows
                }
            }
        `

        const resp = await request(endpointUrl, query)
        return resp.delete_notes.affected_rows
    },
    async bulkAdd (data) {
        console.log('Bulk Add')
        console.log(data)

        const reformatted = {
            data: data
        }

        const query = `
            mutation insert_notes($data: [notes_insert_input!]!) {
                insert_notes(objects: $data) {
                    affected_rows
                }
            }
        `

        const resp = await request(endpointUrl, query, reformatted)
        return resp.insert_notes.affected_rows
    },
    async count () {
        const query = `
            query {
                notes_aggregate {
                    aggregate {
                        count
                    }
                }
            }
        `

        const resp = await request(endpointUrl, query)
        return resp.notes_aggregate.aggregate.count
    }

}

export default NoteDb

