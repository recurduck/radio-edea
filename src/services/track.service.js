import axios from 'axios'
import { localstorageService } from './async-storage.service.js'

export const trackService = {
    search,
    query,
    getById,
    add,
    remove,
}
//debbug
window.ts = trackService;


async function search(trackName, pagination) {
    const url = pagination ? pagination : `https://api.mixcloud.com/search/?limit=6&offset=0&q=${trackName}&type=cloudcast`
    return await (await axios.get(url)).data
}

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