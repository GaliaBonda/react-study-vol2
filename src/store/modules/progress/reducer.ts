const initialState = { shown: false };


export default function reducer(state = initialState, action: { type: string, payload?: any }) {
    switch (action.type) {
        case 'SHOW_PROGRESS_BAR':
            return { shown: true };
        case 'CLOSE_PROGRESS_BAR':
            return { shown: false };
        default: {
            return { ...state };
        }
    }
}
