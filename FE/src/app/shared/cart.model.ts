
export interface ProductOrder{
    productId: number,
    productName: string,
    imagePath: string,
    price: number,
    sale: number,
    quantity: number,
}

export interface ProductInOrderToPost{
    productId: number,
    quantity: number,
    price: number,
}
