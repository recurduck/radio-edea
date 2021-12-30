function on(eventName, listener) {
    const callListener = ({ detail }) => {
        listener(detail);
    };
    window.addEventListener(eventName, callListener);
    return () => {
        window.removeEventListener(eventName, callListener);
    };
}

function emit(eventName, data) {
    window.dispatchEvent(new CustomEvent(eventName, { detail: data }));
}

export const userEvents = { on, emit };

export function showUserMsg(txt, type = '') {
    userEvents.emit('show-user-msg', { txt, type })
}

export function showSuccessMsg(txt) {
    showUserMsg(txt, 'success')
}

export function showErrorMsg(txt) {
    showUserMsg(txt, 'danger')
}

window.myBus = userEvents;
window.showUserMsg = showUserMsg;