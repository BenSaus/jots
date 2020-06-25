

function addNewTimestamps (data) {
    const newData = { ...data }
    const date = new Date(Date.now())
    newData.created_at = date.toISOString()
    newData.updated_at = date.toISOString()
    return newData
}

function addUpdateTimestamps (data) {
    const updatedNote = { ...data }
    const date = new Date(Date.now())
    updatedNote.updated_at = date.toISOString()
    delete updatedNote.created_at

    return updatedNote
}

function convertEmptyStringsToNulls (obj) {
    const copy = { ...obj }
    for (const key of Object.keys(copy)) {
        if (typeof copy[key] === 'string' && copy[key].trim() === '') {
            copy[key] = null
        }
    }
    return copy
}


export default {
    convertEmptyStringsToNulls,
    addNewTimestamps,
    addUpdateTimestamps,
}