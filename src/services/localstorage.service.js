export const localstorageService = {
    loadFromStorage,
    saveToStorage
}

function loadFromStorage(entityType) {
    return JSON.parse(localStorage.getItem(entityType))
}

function saveToStorage(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}