export const localstorageService = {
    loadFromStorage,
    saveToStorage
}
//debbug
window.lss = localstorageService;

function loadFromStorage(entityType, delay = 1200) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || {searchHistory: []}
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(entities)
        }, delay)   
    })
}

function saveToStorage(entityType, entities) {
    return Promise.resolve(localStorage.setItem(entityType, JSON.stringify(entities)))
}