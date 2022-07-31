export default interface ICard {
    title: string;
    id: string;
    position: string;
    created_at?: string;
    description?: string;
    boardId: string;
    listId: string;
}