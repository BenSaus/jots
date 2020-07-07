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
        clearDb: async function () {
            console.log(this)
            
            await NoteGraphQL.deleteAll()
            await NoteTagGraphQL.deleteAll()
            await TagGraphQL.deleteAll()
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
        importText: async function (data) {
            const lines = data
            const newArr = JSON.parse(lines)
        
            console.log(newArr)

            // check version here
            // if (newArr.version !== SCHEMA_VERSION) {
            //     console.error(`Current database schema version:${SCHEMA_VERSION}. File version:${newArr.version}`)
            //     throw new Error('This export is a different version than the current database schema. Import aborted')
            // }

            // TODO: Combine these promises and stop import on any errors

            console.log('Importing Notes')
            await NoteGraphQL.bulkAdd(newArr.notes)

            console.log('Importing Tags')
            await TagGraphQL.bulkAdd(newArr.tags)
            
            console.log('Importing NoteTags')
            await NoteTagGraphQL.bulkAdd(newArr.noteTags)
        }
    }
}

export default db


