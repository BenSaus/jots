import config from '../config'
import dexie from '../db/Dexie'
import graphQl from '../db/GraphQL'

const database = config.mode === 'GraphQL' ? graphQl : dexie

export default database
