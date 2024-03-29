const initialState = [
    { id: 1, title: "покупки" },
    { id: 2, title: "подготовка к свадьбе" },
    { id: 3, title: "разработка интернет-магазина" },
    { id: 4, title: "курс по продвижению в соцсетях" }
];


export default function reducer(state = initialState, action: { type: string, payload?: any }) {
    switch (action.type) {
        case 'UPDATE_BOARDS':
            return [...action.payload];
        default: {
            return [...state];
        }
    }
}
