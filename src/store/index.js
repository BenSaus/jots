
import Vue from 'vue'
import Vuex from 'vuex'

import notes from './store-notes'
import tags from './store-tags'
import filters from './store-filters'
import noteTags from './store-noteTags'

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
        notes,
        tags,
        filters,
        noteTags
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
