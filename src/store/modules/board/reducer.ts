const initialState = {
    board: {
        id: 0,
        title: "Моя тестовая доска",
        lists: [ {
                id: 1,
                title: "Планы",
                cards: [
                    { id: 1, title: "помыть кота" },
                    { id: 2, title: "приготовить суп" },
                    { id: 3, title: "сходить в магазин" }
                ],
                position: 1,
            },
            {
                id: 2,
                title: "В процессе",
                cards: [
                    { id: 4, title: "посмотреть сериал" }
                ],
                position: 2,
            },
            {
                id: 3,
                title: "Сделано",
                cards: [
                    { id: 5, title: "сделать домашку" },
                    { id: 6, title: "погулять с собакой" }
                ],
                position: 3,
            }
        ],
    }
};

export default function reducer(state = initialState, action: { type: string, payload?: any }) {
    switch (action.type) {
        case 'GET_BOARD':
            return {
                board: {...action.payload, lists: Object.values(action.payload.lists)},
            };
        case 'EDIT_BOARD':
            return {
                board: {...action.payload, lists: state.board.lists, id: state.board.id},
            };
        case 'POST_LIST':
            return {
                board: {
                    ...state.board,
                    lists: [...state.board.lists, {...action.payload}]
                },
    };
        case 'EDIT_LIST':
            return {
                board: {
                    ...state.board,
                    lists: state.board.lists.map((item) => {
                        if (item.position == action.payload.position) {
                            return item = {...action.payload, cards: item.cards, id: item.id};
                        } else {
                          return item;  
                        }
                        
                    }),
                },
    };
        case 'POST_CARD':
            
            const updatedLists = [...state.board.lists];
            const targetListIndex = updatedLists.findIndex((item) => {
                return item.id == action.payload.list_id;
            });
            
            
            updatedLists[targetListIndex].cards = {
                ...updatedLists[targetListIndex].cards,
                [action.payload.id]: action.payload
            };
            // console.log(updatedLists);
            // const updatedList = state.board.lists.map
            return {
                board: {
                    ...state.board,
                    lists: updatedLists,
                },
            };
        case 'EDIT_CARD':
            
            const editedLists = [...state.board.lists];
            const targetIndex = editedLists.findIndex((item) => {
                return item.id == action.payload.list_id;
            });
            
            
            editedLists[targetIndex].cards = {
                ...editedLists[targetIndex].cards,
                [action.payload.id]: action.payload
            };
            // console.log(updatedLists);
            // const updatedList = state.board.lists.map
            return {
                board: {
                    ...state.board,
                    lists: editedLists,
                },
        };
        default: {
        return { ...state };
    }
}
}
