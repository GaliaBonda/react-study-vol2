export const showError = (shown: boolean, message: string) => {
    return { type: shown ? 'SHOW_ERROR' : 'CLOSE_ERROR', payload: message };
}