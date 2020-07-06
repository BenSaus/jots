import config from '../../config'
import Dexie from 'dexie'

import NoteDexie from './NoteDexie'
import TagDexie from './TagDexie'
import NoteTagDexie from './NoteTagDexie'

let dexie
const SCHEMA_VERSION = config.schemaVersion 

export function startDb () {
    dexie = new Dexie('notesDb')
    dexie.version(SCHEMA_VERSION).stores({
            notes: '&id, &title, text, color, tags, created, modified, state, created_at, updated_at',
            tags: '&id, &name, color, hotbar, created_at, updated_at',
        }
    )
}
startDb()

const db = {
    notes: NoteDexie,
    tags: TagDexie,
    noteTags: NoteTagDexie,

    dexie,
    routines: {
        clearDb: async function () {
            await dexie.notes.clear()
            await dexie.tags.clear()
        },
        exportJSON: async function () {
            const notesArray = await dexie.notes.toArray()
            const tagsArray = await dexie.tags.toArray()
    
            const allData = {
                notes: notesArray,
                tags: tagsArray,
                version: SCHEMA_VERSION,
            }
    
            const blob = new Blob([JSON.stringify(allData, null, 2)], {
                type: 'text/plain;charset=utf8'
            })
        
            return blob
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
    
            console.log('Importing Notes')
            await dexie.notes.bulkAdd(newArr.notes)
    
            console.log('Importing Tags')
            await dexie.tags.bulkAdd(newArr.tags)
        }
    }
}




export default db