export const initialState = {
    user: {
        displayName: "Jun"
    },
    isSidebarOpen: false
};

export const actionTypes = {
    SET_USER: "SET_USER",
    OPEN_SIDE_NAV: "OPEN_SIDE_NAV",
    CLOSE_SIDE_NAV: "CLOSE_SIDE_NAV",
    TOGGLE_SIDE_NAV: "TOGGLE_SIDE_NAV"
};

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user
            };

        case actionTypes.OPEN_SIDE_NAV:
            return {
                ...state,
                isSidebarOpen: true
            };

        case actionTypes.CLOSE_SIDE_NAV:
            return {
                ...state,
                isSidebarOpen: false
            };

        case actionTypes.TOGGLE_SIDE_NAV:
            return {
                ...state,
                isSidebarOpen: !state.isSidebarOpen
            };

        default:
            return state;
    }
};

export default reducer;
