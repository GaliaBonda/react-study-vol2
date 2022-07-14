const initialState = {
    common: {
        token: '',
    }
};

export default function reducer(state = initialState, action: { type: string, payload?: any }) {
    switch (action.type) {
        
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