export interface Product{
    id: number,
    name: string,
    price: number,
    sale: number,
    inventory: number,
    categoryId: number,
    description: string,
    picture: string,
}


export interface CreateProduct{
    name: string,
    price: number,
    sale: number,
    inventory: number,
    categoryId: number,
    description: string,
    picture: string,
}