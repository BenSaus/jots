import Vue from 'vue'
import db from '../db' 

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

            // // Find differences between originalNote and note

            // // If there are differences

            //     // create update payload
            //     const updatePayload = {
            //         id: this.note.id,
            //         updates: {
            //             // diffs here
            //         }
            //     }

            //     // save the updated note
            //      await db.notes.where('id').equals(payload.id).modify(payload.updates)


        // WARNING: Currently the whole object is sent as an update.
        //              This could be very inefficient if the object is large
        //              Instead send only the updated values as outlined above
        await db.notes.where('id').equals(payload.id).modify(payload)
        context.commit('updateNote', payload)
    },

    async deleteNote (context, payload) {
        console.log('Delete Note')
        console.log(payload.id)
        
        // ERROR!!!!!!!!  What if there is an error when calling the DB!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        await db.notes.where('id').equals(payload.id).delete()
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
    // allows multiple stores
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}