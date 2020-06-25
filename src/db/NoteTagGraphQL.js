import dbUtils from './dbUtils'
import uuid from 'uuid/dist/v4'

const endpointUrl = 'http://192.168.1.10:9002/v1/graphql'

const NoteTagGraphQL = {
    async getNoteTags (context) {
        console.log('GetNoteTags')
        
        const { request } = context
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
    async createNoteTag (context, data) {
        console.log('Create Note Tag')  
        console.log(data)
       
        const processedData = this._processNoteTag(data)

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

        const resp = await request(endpointUrl, query, processedData)
        // WARNING: Assumes only one product is being created
        return resp.insert_note_tag.returning[0]
    },
    _processNoteTag (data) {
        const finalData = dbUtils.addNewTimestamps(data)
        finalData.id = uuid()

        return finalData
    },
    async deleteNoteTag (context, data) {
        const { request } = context
        
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
    }
}

export default NoteTagGraphQL