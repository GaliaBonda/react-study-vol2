const initialState = {
    token: '',

};

export default function reducer(state = initialState, action: { type: string, payload?: any }) {
    switch (action.type) {

        case 'AUTHORIZE':
            return {
                ...state,
                token: action.payload,

            };
        default: {
            return { ...state };
        };
    }
}