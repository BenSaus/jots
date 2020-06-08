import Dexie from 'dexie'

const db = new Dexie('notesDb')
db.version(1).stores({ notes: '++&id, &title, text, *tags, created, state' })

export default db