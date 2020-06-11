import Vue from 'vue'
import db from '../db' 

const testData = [
    {
        id: '1',
        name: 'Work',
        color: 'purple',
        hotbar: true
    },
    {
        id: '2',
        name: 'Personal',
        color: 'pink',
        hotbar: true
    },
    {
        id: '16',
        name: 'Notes',
        color: 'orange',
        hotbar: true
    },
    {
        id: '3',
        name: 'DSP',
        color: 'red',
        hotbar: false
    },
    {
        id: '4',
        name: 'Web',
        color: 'blue',
        hotbar: true
    },
    {
        id: '5',
        name: 'RPG Notes',
        color: 'green',
        hotbar: true
    }
]

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
        // const tags = await db.tags.toArray()
        const tags = testData

        console.log('fetchtags', tags)
        context.commit('setTags', tags)
    },

    async createTag (context, tag) {
        console.log('Create Tag')
        console.log(tag)
        
        await db.tags.put(tag)
        context.commit('createTag', tag)
    },

    async updateTag (context, payload) {
        console.log('Update Tag')
        console.log(payload)

        // WARNING: Currently the whole object is sent as an update.
        //              This could be very inefficient if the object is large
        //              Instead send only the updated values as outlined above
        await db.tags.where('id').equals(payload.id).modify(payload)
        context.commit('updateTag', payload)
    },

    async deleteTag (context, payload) {
        console.log('Delete Tag')
        console.log(payload.id)
        
        await db.tags.where('id').equals(payload.id).delete()
        context.commit('deleteTag', payload)
    }
}

const getters = {
    allTags: (state) => state.tags,

    getTagById: (state) => (id) => {
        return state.tags.find(tag => tag.id === id)
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