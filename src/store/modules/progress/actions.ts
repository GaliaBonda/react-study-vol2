export const showProgress = (shown: boolean) => {
    return { type: shown ? 'SHOW_PROGRESS_BAR' : 'CLOSE_PROGRESS_BAR' };
}