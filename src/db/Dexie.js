import Dexie from 'dexie'

let db
const SCHEMA_VERSION = 5

export function startDb () {
    db = new Dexie('notesDb')
    db.version(SCHEMA_VERSION).stores({
            notes: '++&id, &title, text, color, created, modified, state, created_at, updated_at',
            tags: '&id, &name, color, hotbar, created_at, updated_at',
            noteTags: 'note_id, tag_id, created_at, updated_at'
        }
    )
}
startDb()




db.noteRoutine = {
    clearDb: async function () {
        await db.notes.clear()
        await db.tags.clear()
    },
    exportJSON: async function () {
        const notesArray = await db.notes.toArray()
        const tagsArray = await db.tags.toArray()

        // const noteTags = []        
        // for (const note of notesArray) {
        //     const tags = note.tags
        //     for (const tag of tags) {
        //         console.log(tag)
        //         noteTags.push({
        //             note_id: note.id,
        //             tag_id: tag
        //         })
        //     }
        // }

        const allData = {
            notes: notesArray,
            tags: tagsArray,
            version: SCHEMA_VERSION,
            // noteTags: noteTags
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
        if (newArr.version !== SCHEMA_VERSION) {
            console.error(`Current database schema version:${SCHEMA_VERSION}. File version:${newArr.version}`)
            throw new Error('This export is a different version than the current database schema. Import aborted')
        }
    
        await db.notes.bulkAdd(newArr.notes)
        await db.tags.bulkAdd(newArr.tags)
    }
}



export default db