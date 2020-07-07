import util from '../dbUtils'
import uuid from 'uuid/dist/v4'

// TODO: Inject this instead for testing
import request from 'graphql-request'
import config from '../../config'

const endpointUrl = config.graphqlEndpoint

const TagDbGraphQL = {
    async getTags () {
        const query = `
            query {
                tags {
                    id
                    name
                    color
                    hotbar
                    created_at
                    updated_at
                }
            }
        `

        const resp = await request(
            endpointUrl,
            query
        )
        return resp.tags
    },
    async createTag (data) {
        const newTag = this._addNewTimestamps(data)


        const query = `
            mutation insert_tags(
                $id: uuid!, 
                $name: String!, 
                $color: String!, 
                $hotbar: Boolean!,
                $created_at: timestamptz!,
                $updated_at: timestamptz!
            ) {
                insert_tags(objects: {
                    id: $id, 
                    name: $name, 
                    color: $color, 
                    hotbar: $hotbar, 
                    created_at: $created_at,
                    updated_at: $updated_at
                }
                ) {
                    returning {
                        id
                        name
                        color
                        hotbar
                        created_at
                        updated_at
                    }
                }
            }
        `

        const params = util.convertEmptyStringsToNulls(newTag)
        params.id = uuid()

        const resp = await request(endpointUrl, query, params)
        // WARNING: Assumes only one product is being created
        return resp.insert_tags.returning[0]
    },
    _addNewTimestamps (data) {
        const newTag = { ...data }
        const date = new Date(Date.now())
        newTag.created_at = date.toISOString()
        newTag.updated_at = date.toISOString()
        return newTag
    },
    async updateTag (data) {
        const updatedTag = this._addUpdateTimestamps(data)
        const query = `
            mutation update_tags (
                $id: uuid!,
                $name: String!, 
                $color: String!, 
                $hotbar: Boolean!, 
                $updated_at: timestamptz!
            ) {
                update_tags (_set: {
                    name: $name,
                    color: $color,
                    hotbar: $hotbar,
                    updated_at: $updated_at
                }, where: {id: {_eq: $id}}) {
                    affected_rows
                    returning {
                        id
                    }
                }
            }

        `

        const params = util.convertEmptyStringsToNulls(updatedTag)
        const resp = await request(
            endpointUrl,
            query,
            params
        )

        return resp.update_tags.returning[0].id
    },
    _addUpdateTimestamps (data) {
        const updatedTag = { ...data }
        const date = new Date(Date.now())
        updatedTag.updated_at = date.toISOString()
        delete updatedTag.created_at

        return updatedTag
    },
    async deleteTag (id) {
        const query = `
            mutation delete_tags($id: uuid!) {
                delete_tags(where: {id: {_eq: $id}}) {
                    affected_rows
                    returning {
                        id
                    }
                }
            }
        `

        const resp = await request(
            endpointUrl,
            query,
            { id }
        )
        return resp.delete_tags.returning[0].id
    },
    async deleteAll () {
        const query = `
            mutation {
                delete_tags(where: {}) {
                    affected_rows
                }
            }
        `

        const resp = await request(endpointUrl, query)
        return resp.delete_tags.affected_rows
    },
    async bulkAdd (data) {
        console.log('Bulk Add')
        console.log(data)

        const reformatted = {
            data: data
        }

        const query = `
            mutation insert_tags($data: [tags_insert_input!]!) {
                insert_tags(objects: $data) {
                    affected_rows
                }
            }
        `

        const resp = await request(endpointUrl, query, reformatted)
        return resp.insert_tags.affected_rows
    }

}

export default TagDbGraphQL

