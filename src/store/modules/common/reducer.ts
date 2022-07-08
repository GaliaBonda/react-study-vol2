const initialState = {
    progressBar: false,
};

export default function reducer(state = initialState, action: { type: string, payload?: any }) {
    switch (action.type) {
        case 'PROGRESS_BAR_ON':
            return {
                progressBar: true,
            };
            case 'PROGRESS_BAR_OFF':
            return {
                progressBar: false,
            };
        default: {
            return { ...state };
        };
    }
}