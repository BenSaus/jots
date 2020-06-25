import noteTagDexie from '../db/NoteTagDexie'
import db from '../db/Dexie'

import noteTagGraphQL from '../db/NoteTagGraphQL'
import request from 'graphql-request'

const GRAPHQL = true

const state = {
    noteTags: []
}

const mutations = {
    setNoteTags (state, noteTags) {
        state.noteTags = noteTags
    },
    createNoteTag (state, noteTag) {
        state.noteTags.push(noteTag)
    },
    deleteNoteTag (state, payload) {
        // warning: this could take a while if there are many notetags. Consider moving to action
        const noteTagIndex = state.noteTags.findIndex(noteTag => noteTag.note_id === payload.noteId &&
            noteTag.tag_id === payload.tagId)

        if (noteTagIndex !== -1) state.noteTags.splice(noteTagIndex, 1)
        else throw new Error(`NoteTag not found: ${payload}`)
    }
}

const actions = {
    async fetchNoteTags (context) {
        let noteTags
        if (GRAPHQL) noteTags = await noteTagGraphQL.getNoteTags({ request })
        else noteTags = await noteTagDexie.getNoteTags({ db })
        console.log('fetchNoteTags', noteTags)

        context.commit('setNoteTags', noteTags)
    },
    async linkNoteAndTag (context, payload) {
        const { noteId, tagId } = payload
        let newNoteTag = {
            note_id: noteId,
            tag_id: tagId,
        }

        if (GRAPHQL) newNoteTag = await noteTagGraphQL.createNoteTag({ request }, newNoteTag)
        else newNoteTag = await noteTagDexie.createNoteTag({ db }, newNoteTag)
        context.commit('createNoteTag', newNoteTag)
    },
    async unlinkNoteAndTag (context, payload) {
        const noteTag = {
            note_id: payload.noteId,
            tag_id: payload.tagId
        }
        if (GRAPHQL) await noteTagGraphQL.deleteNoteTag({ request }, noteTag) 
        else await noteTagDexie.deleteNoteTag({ db }, payload)
        context.commit('deleteNoteTag', payload)
    },
}

const getters = {
    allNoteTags: (state) => state.noteTags,
    tagIdsForNote: (state) => (noteId) => { 
        const taged = state.noteTags.filter(noteTag => noteTag.note_id === noteId)
        const mapped = taged.map(noteTag => noteTag.tag_id) 
        return mapped
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}