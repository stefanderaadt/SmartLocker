export function openTopBarMenu(anchorEl) {
    return { type: 'OPEN_TOP_BAR_MENU', payload: anchorEl };
}

export function closeTopBarMenu() {
    return { type: 'CLOSE_TOP_BAR_MENU' };
}
