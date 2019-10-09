const defaultState = {
    open: true,
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'OPEN_SIDE_BAR':
            return {
                open: true,
            };
        case 'CLOSE_SIDE_BAR':
            return {
                open: false,
            };
        default:
            return state;
    }
};
