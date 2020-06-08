
import db from '../db' 

const state = {
    notes: []
}


// WARNING: These modify local state only NOT the persistant STATE!!!
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

        // Use object assign to update note
        // Remember: This is target, then source
        Object.assign(state.notes[noteId], payload.updates)
    }
}


// Best practice: create action that calls a mutation
const actions = {
    async fetchNotes (context) {
        const notes = await db.notes.toArray()
        console.log('fetchNotes', notes)

        context.commit('setNotes', notes)
    },

    async createNote (context, note) {
        console.log('Create Note')
        console.log(note)
        
        await db.notes.put(note)
        context.commit('createNote', note)
    },

    async updateNote (context, payload) {
        console.log('Update Note')
        console.log(payload)

        await db.notes.where('id').equals(payload.id).modify(payload.updates)
        context.commit('updateNote', payload)
    },
}

const getters = {
    notes: (state) => state.notes
}

export default {
    // allows multiple stores
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}