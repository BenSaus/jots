import dexie from './Dexie/Dexie'
import graphQl from './GraphQL/GraphQL'
import config from '../config'

const database = config.mode === 'GraphQL' ? graphQl : dexie

export default database
