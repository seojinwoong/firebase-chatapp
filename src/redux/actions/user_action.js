import {
    SET_USER,
    CLEAR_USER,
    DO_RENDER
} from './types';

export function setUser(user) {
    return {
        type: SET_USER,
        payload: user
    }
}
export function clearUser() {
    return {
        type: CLEAR_USER,
    }
}
export function doRender() {
    return {
        type: DO_RENDER
    }
}