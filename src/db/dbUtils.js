
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
    convertEmptyStringsToNulls
}