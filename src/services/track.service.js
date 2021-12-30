
export const trackService = {
    query,
    getById,
    add,
    remove,
}
//debbug
window.ts = trackService;

async function query(filterBy, entityType = 'mytracks') {
    console.log(`querry - filter by:${filterBy} entityType: ${entityType}`);
    
}

async function getById(trackId) {
    console.log('getById', trackId);
}

async function add(track) {
    console.log('add', track);
}

async function remove(trackId) {
    console.log('remove', trackId);
}