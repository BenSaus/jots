const state = {
    tagFilters: [],
}

const mutations = {
    setTagFilters (state, tagFilters) {
        state.tagFilters = tagFilters
    },
}

const actions = {
    setTagFilters (context, tagFilters) {
        context.commit('setTagFilters', tagFilters)
    },
}

const getters = {
    tagFilters: (state) => state.tagFilters
}

export default {
    // allows multiple stores
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}