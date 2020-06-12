const state = {
    tagFilters: [],
    stateFilter: 'active'
}

const mutations = {
    setTagFilters (state, tagFilters) {
        state.tagFilters = tagFilters
    },
    setStateFilter (state, stateFilter) {
        state.stateFilter = stateFilter
    }
}

const actions = {
    setTagFilters (context, tagFilters) {
        context.commit('setTagFilters', tagFilters)
    },
    setStateFilter (context, stateFilter) {
        context.commit('setStateFilter', stateFilter)
    }
}

const getters = {
    tagFilters: (state) => state.tagFilters,
    stateFilter: (state) => state.stateFilter
}

export default {
    // allows multiple stores
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}