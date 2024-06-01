export default interface Block {
    id: string,
    name: string,
    index: number,
    image: string | null,
    creationUser: string,
    modificationUser: string,
    creationDate: string,
    modificationDate: string
}