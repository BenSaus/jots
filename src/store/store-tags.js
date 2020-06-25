import Vue from 'vue'
import db from '../db/Dexie'
import tagDexie from '../db/TagDexie'

import request from 'graphql-request'
import tagGraphQL from '../db/TagGraphQL'

const GRAPHQL = true


const state = {
    tags: [],
}


const mutations = {
    setTags (state, tags) {
        state.tags = tags
    },
    createTag (state, tag) {
        state.tags.push(tag)
    },
    updateTag (state, payload) {
        // Find tag index
        const tagId = state.tags.findIndex(tag => tag.id === payload.id)
        const tag = state.tags[tagId]

        // https://vuex.vuejs.org/guide/mutations.html
        // Use the following to update state.
        //     This is required for reactivity of all components 
        for (const key of Object.keys(payload)) {
            Vue.set(tag, key, payload[key])
        }
    },
    deleteTag (state, payload) {
        const tagId = payload.id
        const tagIndex = state.tags.findIndex(tag => tag.id === tagId)

        if (tagIndex !== -1) state.tags.splice(tagIndex, 1)
        else throw new Error(`Tag not found: ${tagId}`)
    }
}

const actions = {
    async fetchTags (context) {
        let tags
        
        if (GRAPHQL) tags = await tagGraphQL.getTags({ request })
        else tags = await tagDexie.getTags({ db })

        console.log('fetchtags', tags)
        context.commit('setTags', tags)
    },
    async createTag (context, tag) {
        console.log('Create Tag')
        console.log(tag)

        let newTag
        if (GRAPHQL) newTag = await tagGraphQL.createTag({ request }, tag)
        else newTag = await tagDexie.createTag({ db }, tag)
        context.commit('createTag', newTag)
    },
    async updateTag (context, payload) {
        console.log('Update Tag')
        console.log(payload)

        if (GRAPHQL) await tagGraphQL.updateTag({ request }, payload)
        else await tagDexie.updateTag({ db }, payload)

        context.commit('updateTag', payload)
    },
    async deleteTag (context, payload) {
        console.log('Delete Tag')
        console.log(payload.id)

        if (GRAPHQL) await tagGraphQL.deleteTag({ request }, payload.id)
        else await tagDexie.deleteTag({ db }, payload.id)

        context.commit('deleteTag', payload)
    },

}

const getters = {
    allTags: (state) => state.tags,
    getTagById: (state) => (id) => {
        return state.tags.find(tag => tag.id === id)
    },
    isDuplicateName: (stote) => (payload) => {
        // Not sure this is the best place to check validation logic
        //      but the data resides here
        return false
    }
}

export default {
    // allows multiple stores
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}