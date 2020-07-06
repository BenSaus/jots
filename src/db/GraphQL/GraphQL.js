import config from '../../config'
import request from 'graphql-request'

import NoteGraphQL from './NoteGraphQL'
import NoteTagGraphQL from './NoteTagGraphQL'
import TagGraphQL from './TagGraphQL'


const db = {
    notes: NoteGraphQL,
    tags: TagGraphQL,
    noteTags: NoteTagGraphQL,

    request: request,
    routines: {
        async clearDb () {
            console.log('clear all notes')
        },
        exportJSON: async function () {
            // TODO: Combine these promises
            const context = { request }
            const notes = await this._getAllNotes(context)
            const tags = await this._getAllTags(context)
            const noteTags = await this._getAllNoteTags(context)

            const output = {
                notes,
                tags,
                noteTags,
                version: config.schemaVersion
            }

            const blob = new Blob([JSON.stringify(output, null, 2)], {
                type: 'text/plain;charset=utf8'
            })
        
            return blob
        },
        async _getAllNotes (context) {
            const { request } = context
            const query = `
                {
                    notes {
                        id
                        title
                        text
                        state
                        color
                        created_at
                        updated_at
                    }
                }
            `

            const resp = await request(config.graphqlEndpoint, query)

            console.log(resp)
            return resp.notes
        },
        async _getAllTags (context) {
            const { request } = context
            const query = `
                {
                    tags {
                        id
                        name
                        hotbar
                        color
                        created_at
                        updated_at
                    }
                }
            `

            const resp = await request(config.graphqlEndpoint, query)

            console.log(resp)
            return resp.tags
        },
        async _getAllNoteTags (context) {
            const { request } = context
            const query = `
                {
                    note_tag {
                        id
                        note_id
                        tag_id
                        created_at
                        updated_at
                    }
                }
            `
            const resp = await request(config.graphqlEndpoint, query)

            console.log(resp)
            return resp.note_tag
        },

        importText: async function () {

        }
    }
}

export default db


