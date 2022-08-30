const initialState = { shown: false, message: "" };


export default function reducer(state = initialState, action: { type: string, payload?: any }) {
    switch (action.type) {
        case 'SHOW_ERROR':
            return { shown: true, message: action.payload };
        case 'CLOSE_ERROR':
            return { shown: false, message: "" };
        default: {
            return { ...state };
        }
    }
}
