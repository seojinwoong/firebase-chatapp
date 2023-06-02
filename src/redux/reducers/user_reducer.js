import {
    SET_USER,
    CLEAR_USER,
    DO_RENDER
} from '../actions/types';

const initialUserState = {
    currentUser: null,
    isLoading: true,
    renderCounts: 0
}

export default function (state = initialUserState, action) {
    switch (action.type) { 
        case SET_USER:
            return {
                ...state,
                currentUser: action.payload,
                isLoading: false
            }
        case CLEAR_USER:
            return {
                ...state,
                currentUser: null,
                isLoading: false
            }
        case DO_RENDER:
            return {
                ...state,
                renderCounts: state.renderCounts + 1
            }
        default: 
            return state;
    }
}