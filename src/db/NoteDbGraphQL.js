import util from './dbUtils'
import uuid from 'uuid/v4'

const endpointUrl = process.env.GRAPHQL_API_END_POINT

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
                }
            }
        `

        const resp = await request(
            endpointUrl,
            query
        )
        return resp.notes
    },
    // async getNote (context, id) {
    //     const { request } = context

    //     const query = `
    //         query notes_by_pk($id: uuid!) {
    //             notes_by_pk(id: $id) {
    //                 id
    //                 title
    //                 text
    //                 color
    //                 state
    //             }
    //         }
    //     `

    //     const resp = await request(
    //         endpointUrl,
    //         query,
    //         { id }
    //     )
    //     return resp.notes_by_pk
    // },
    async createNote (context, data) {
        const { request } = context

        const query = `
            mutation insert_notes(
                $id: uuid!, 
                $title: String!, 
                $text: String, 
                $color: String!, 
                $state: String!, 
            ) {
                insert_notes(objects: {
                    id: $id, 
                    title: $title, 
                    text: $text
                    color: $color, 
                    state: $state, 
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

        const params = util.convertEmptyStringsToNulls(data)
        params.id = uuid()

        const resp = await request(endpointUrl, query, params)
        // WARNING: Assumes only one product is being created
        return resp.insert_notes.returning[0]
    },
    async updateNote (context, data) {
        const { request } = context
        const query = `
            mutation update_notes (
                $id: uuid!,
                $title: String!, 
                $text: String, 
                $color: String!, 
                $state: String!, 
            ) {
                update_notes (_set: {
                    title: $title,
                    text: $text,
                    color: $color,
                    state: $state,
                }, where: {id: {_eq: $id}}) {
                    affected_rows
                    returning {
                        id
                    }
                }
            }

        `

        // NOTICE: If affected_rows > 1 then we have an error

        const params = util.convertEmptyStringsToNulls(data)
        const resp = await request(
            endpointUrl,
            query,
            params
        )

        return resp.update_notes.returning[0].id
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

