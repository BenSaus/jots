import Dexie from 'dexie'

const db = new Dexie('notesDb')
db.version(4).stores({ 
        notes: '++&id, &title, text, *tags, color, created, modified, state',
        tags: '&id, &name, color, hotbar'
    }
)

export default db