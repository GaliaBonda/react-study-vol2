const initialState = {
    common: {
        progressBar: false,
        token: '',
    }
};

export default function reducer(state = initialState, action: { type: string, payload?: any }) {
    switch (action.type) {
        case 'PROGRESS_BAR_ON':
            return {
                common: {
                    ...state.common,
                progressBar: true,
                }
            };
        case 'PROGRESS_BAR_OFF':
            return {
                common: {
                    ...state.common,
                progressBar: false,
                }
            };
        case 'AUTHORIZE':
            return {
                common: {
                ...state.common,
                token: action.payload,
            }
                
            };
        default: {
            return { ...state };
        };
    }
}