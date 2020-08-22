import uuid from 'uuid/dist/v4'

const TagDbDexie = (db) => {
    return {
        async getTags () {
            return await db.tags.toArray()
        },
        async createTag (data) {
            // Copy the tag to Keep input parameters untouched
            const newTag = { ...data }
            newTag.id = uuid()
    
            await db.tags.put(newTag)
            return newTag
        },
        async updateTag (data) {
            await db.tags.where('id').equals(data.id).modify(data)
            return data.id
        },
        async deleteTag (id) {
            await db.tags.where('id').equals(id).delete()
            return id
        }
    }
}

export default TagDbDexie