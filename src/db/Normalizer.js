
const normalizer = {
    normalizeNote (note) {
        const normalNote = { ...note }

        // seperate tags from note.tags
        delete normalNote.tags

        // Convert tag list to normalized list 
        const normalTags = note.tags.map(tag => {
            return {
                note_id: note.id,
                tag_id: tag.id
            }
        })

        const result = { 
            note: normalNote, 
            tags: normalTags 
        }

        return result
    }    
}

export default normalizer

