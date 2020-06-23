import Vue from 'vue'
import noteDbDexie from '../db/NoteDbDexie'
import db from '../db/Dexie'

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


// Best practice: create action that calls a mutation
const actions = {
    async fetchNotes (context) {
        const notes = await noteDbDexie.getNotes({ db })
        console.log('fetchNotes', notes)
        context.commit('setNotes', notes)
    },

    async createNote (context, note) {
        console.log('Create Note')
        console.log(note)

        const newNote = await noteDbDexie.createNote({ db }, note)
        context.commit('createNote', newNote)
    },

    async updateNote (context, payload) {
        console.log('Update Note')
        console.log(payload)
        
        await noteDbDexie.updateNote({ db }, payload)
        context.commit('updateNote', payload)
    },

    async deleteNote (context, payload) {
        console.log('Delete Note')
        console.log(payload.id)

        await noteDbDexie.deleteNote({ db }, payload.id)
        context.commit('deleteNote', payload)
    }
}

const getters = {
    allNotes: (state) => state.notes,

    getNoteById: (state) => (id) => {
        return state.notes.find(note => note.id === id)
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}