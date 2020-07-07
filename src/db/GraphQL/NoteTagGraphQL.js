import dbUtils from '../dbUtils'
import uuid from 'uuid/dist/v4'

// TODO: Inject this instead for testing
import request from 'graphql-request'
import config from '../../config'

const endpointUrl = config.graphqlEndpoint

const NoteTagGraphQL = {
    async getNoteTags () {
        console.log('GetNoteTags')

        const query = `
            query {
                note_tag {
                    id
                    note_id
                    tag_id
                }
            }
        `
        const resp = await request(endpointUrl, query)
        console.log(resp)

        return resp.note_tag
    },
    async createNoteTag (data) {
        console.log('Create Note Tag')  
        console.log(data)
       
        const processedData = this._processNoteTag(data)


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

        const resp = await request(endpointUrl, query, processedData)
        // WARNING: Assumes only one product is being created
        return resp.insert_note_tag.returning[0]
    },
    _processNoteTag (data) {
        const finalData = dbUtils.addNewTimestamps(data)
        finalData.id = uuid()

        return finalData
    },
    async deleteNoteTag (data) {
        const query = `
            mutation delete_note_tag($note_id: uuid!, $tag_id: uuid!){
                delete_note_tag(
                    where: {
                        note_id: {_eq: $note_id}, tag_id: {_eq: $tag_id}
                    }
                ){
                    affected_rows
                }
            }
        `
        
        const resp = await request(endpointUrl, query, data)
        return resp.delete_note_tag
    },
    async deleteAll () {
        const query = `
            mutation {
                delete_note_tag(where: {}) {
                    affected_rows
                }
            }
        `

        const resp = await request(endpointUrl, query)
        return resp.delete_note_tag.affected_rows
    },
    async bulkAdd (data) {
        console.log('Bulk Add')
        console.log(data)

        const reformatted = {
            data: data
        }

        const query = `
            mutation insert_note_tag($data: [note_tag_insert_input!]!) {
                insert_note_tag(objects: $data) {
                    affected_rows
                }
            }
        `

        const resp = await request(endpointUrl, query, reformatted)
        return resp.insert_note_tag.affected_rows
    }
}

export default NoteTagGraphQL