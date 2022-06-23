import IBoard from "../../../common/interfaces/IBoard"; // не забудьте описать этот интерфейс :)

const initialState = {
    boards: [] as IBoard[]
};


export default function reducer(state = initialState, action: {type: string, payload?: any}) {
    switch (action.type) {
        default: {
            return {...state, ...action.payload};
        }
    }
}
