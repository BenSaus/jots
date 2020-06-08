
import Vue from 'vue'
import Vuex from 'vuex'
// import API, { graphqlOperation } from '@aws-amplify/api'
// import { listNotes } from './graphql/queries'
// import { createNote, deleteNote } from './graphql/mutations'

// Vue.use(Vuex)

// export default new Vuex.Store({
//     state: {
//         notes: []
//     },
//     getters: {
//         getActiveNotes: (state) => state.notes.filter((note) => note.archived === false),
//         allNotes: (state) => state.notes
//     },
//     actions: {

//         async fetchNotes ({ commit }) {
//             // const response = await API.graphql(graphqlOperation(listNotes))
//             // const notes = response.data.listNotes.items
//             const notes = await db.notes.toArray()
//             console.log('fetchNotes', notes)

//             console.log(db)
//             console.log(db.notes)
            
            
//             commit('setNotes', notes)
//         },

//         async createNote (context, note) {
//             // await API.graphql(graphqlOperation(createNote, { input: note }))
//             console.log('create Note called!')
            
//             try {
//                 await db.notes.put(note)
//             } catch (err) {
//                 console.error(err)
//             }
//             context.commit('createNote', note)
//         },

//         async updateNote (context, note) {
//             await db.notes.where('id').equals(note.id).modify(note)
//         },

//         async deleteNote (context, noteId) {
//             console.log('Delete' + noteId)
//             // await API.graphql(
//             //     graphqlOperation(deleteNote, { input: { id: noteId } })
//             // )

//             await db.notes.where('id').equals(noteId).delete()
//             context.commit('deleteNote', noteId)
//         }
//     },
//     mutations: {
//         setNotes (state, notes) {
//             state.notes = notes
//         },

//         createNote (state, note) {
//             state.notes.push(note)
//         },

//         updateNote (state, noteId, note) {
//             const target = state.notes.find((note) => note.id === noteId)

//             for (const key of Object.keys(target)) {
//                 if (typeof note[key] !== 'undefined') {
//                     target[key] = note[key]
//                 }
//             }
//         },

//         deleteNote (state, noteId) {
//             const index = state.notes.findIndex((note) => note.id === noteId)
//             if (index !== -1) {
//                 state.notes.splice(index, 1)
//             }
//         }
//     }
// })




import notes from './store-notes'
Vue.use(Vuex)

// /*
//  * If not building with SSR mode, you can
//  * directly export the Store instantiation;
//  *
//  * The function below can be async too; either use
//  * async/await or return a Promise which resolves
//  * with the Store instance.
//  */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
        notes
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
