
export const trackService = {
    query,
    getById,
    add,
    remove,
}
//debbug
window.ts = trackService;

async function query(filterBy, entityType = 'searchRes') {
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

function _makeId(length = 6) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var txt = '';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}