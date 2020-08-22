import Vue from 'vue'
import db from '../db/Database'

const state = {
    notes: [],
}

const mutations = {
    setNotes (state, notes) {
        state.notes = notes
    },
    createNote (state, note) {
        state.notes.push(note)
    },
    updateNote (state, payload) {
        // Find note index
        const noteId = state.notes.findIndex(note => note.id === payload.id)
        const note = state.notes[noteId]

        // https://vuex.vuejs.org/guide/mutations.html
        // Use the following to update state.
        //     This is required for reactivity of all components 
        for (const key of Object.keys(payload)) {
            Vue.set(note, key, payload[key])
        }
    },
    deleteNote (state, payload) {
        const noteId = payload.id
        const noteIndex = state.notes.findIndex(note => note.id === noteId)

        if (noteIndex !== -1) state.notes.splice(noteIndex, 1)
        else throw new Error(`Note not found: ${noteId}`)
    }
}

const actions = {
    async fetchNotes (context) {
        console.log('Fetch Notes')
        console.log(db)
        
        const notes = await db.notes.getNotes()
        
        console.log('fetchNotes', notes)
        context.commit('setNotes', notes)
    },

    async createNote (context, note) {
        console.log('Create Note')
        console.log(note)

        const newNote = await db.notes.createNote(note)

        context.commit('createNote', newNote)
        return newNote
    },

    async updateNote (context, payload) {
        console.log('Update Note')
        console.log(payload)
    
        await db.notes.updateNote(payload)
        context.commit('updateNote', payload)
    },

    async deleteNote (context, payload) {
        console.log('Delete Note')
        console.log(payload.id)

        await db.notes.deleteNote(payload.id)
        context.commit('deleteNote', payload)
    }
}

const getters = {
    allNotes: (state) => state.notes,
    getNoteById: (state) => (id) => {
        return state.notes.find(note => note.id === id)
    },
    isValid: (state) => (note) => {
        // check for duplicate titles here...
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}