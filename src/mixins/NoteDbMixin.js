import Dexie from 'dexie'

const NoteDbMixin = {

    data () {
        return {
            dexie: null
        }
    },

    methods: {
        // Use context later
        async getAllNotes (context) {       
            return await this.dexie.notes.toArray()
        },

        async openDb () {
            this.dexie = new Dexie('notesDb')
            this.dexie.version(1).stores({ notes: '++id, title, text, tags, created, archived, trashed' })
        },

        async seedDb () {
            await this.dexie.notes.bulkPut([
                { title: 'space', text: 'the final pancake', tags: '', created: Date.now(), archived: true, trashed: false },
                { title: 'myNote', text: 'some test about this note', tags: '', created: Date.now(), archived: false, trashed: false },
                { title: 'Another Note', text: 'lorem and the ipsum', tags: '', created: Date.now(), archived: false, trashed: true },
                { title: 'Client x Notes', text: 'Welcome to the best stage of the carcarus around...yep', tags: '', created: Date.now(), archived: false, trashed: true }
            ])
        },

        async deleteDb () {
            this.dexie = new Dexie('notesDb')
            this.dexie.version(1).stores({ notes: null })
        },
    }
}

export default NoteDbMixin