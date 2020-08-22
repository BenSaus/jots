import dexie from './Dexie/Dexie'
import graphql from './GraphQL/GraphQL'
import config from '../config'

let database

const setSource = (source) => {
    if (source === 'graphql') {
        database = graphql
    }
    else if (source === 'local') {
        database = dexie
    }
}

const initialSource = typeof localStorage.dataSource === 'undefined' ? config.mode : localStorage.dataSource
setSource(initialSource)

export default database
