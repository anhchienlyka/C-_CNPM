export interface Product{
    id: number,
    name: string,
    price: number,
    sale: number,
    inventory: number,
    categoryId: number,
    description: string,
    productImages: ProductImage[],
}

export interface ProductImage{
    id: number,
    imagePath: string,
    index: number,
}

export interface CreateProduct{
    name: string,
    price: number,
    sale: number,
    inventory: number,
    categoryId: number,
    description: string,
}