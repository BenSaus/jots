import util from './utilityMethods'
import uuid from 'uuid/v4'

const endpointUrl = process.env.GRAPHQL_API_END_POINT

const TagDbGraphQL = {
    async getTags (context) {
        const { request } = context
        const query = `
            query {
                tags {
                    id
                    sku
                    name
                    slug
                    description
                }
            }
        `

        const resp = await request(
            endpointUrl,
            query
        )
        return resp.tags
    },
    async getTag (context, id) {
        const { request } = context

        const query = `
            query tags_by_pk($id: uuid!) {
                tags_by_pk(id: $id) {
                    id
                    sku
                    name
                    slug
                    description
                }
            }
        `

        const resp = await request(
            endpointUrl,
            query,
            { id }
        )
        return resp.tags_by_pk
    },
    async createTag (context, data) {
        const { request } = context

        const query = `
            mutation insert_tags(
                $id: uuid!, 
                $name: String!, 
                $sku: String!, 
                $slug: String!, 
                $description: String, 
            ) {
                insert_tags(objects: {
                    id: $id, 
                    name: $name, 
                    sku: $sku, 
                    slug: $slug, 
                    description: $description}) {
                    returning {
                        id
                    }
                }
            }
        `

        const params = util.convertEmptyStringsToNulls(data)
        params.id = uuid()

        const resp = await request(endpointUrl, query, params)
        // WARNING: Assumes only one product is being created
        return resp.insert_tags.returning[0].id
    },
    async updateTag (context, data) {
        const { request } = context
        const query = `
            mutation update_tags (
                $id: uuid!,
                $name: String!, 
                $sku: String!, 
                $slug: String!, 
                $description: String, 
            ) {
                update_tags (_set: {
                    name: $name,
                    sku: $sku,
                    slug: $slug,
                    description: $description,
                }, where: {id: {_eq: $id}}) {
                    affected_rows
                    returning {
                        id
                    }
                }
            }

        `

        const params = util.convertEmptyStringsToNulls(data)
        const resp = await request(
            endpointUrl,
            query,
            params
        )

        return resp.update_tags.returning[0].id
    },
    async deleteTag (context, id) {
        const { request } = context
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
    }

}

export default TagDbGraphQL

