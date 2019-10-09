const defaultState = {
    menuOpen: false,
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'OPEN_TOP_BAR_MENU':
            return {
                anchorEl: action.payload,
                menuOpen: true,
            };
        case 'CLOSE_TOP_BAR_MENU':
            return {
                anchorEl: null,
                menuOpen: false,
            };
        default:
            return state;
    }
};
