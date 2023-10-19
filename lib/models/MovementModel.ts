export interface MovementModel {
    id?: number,
    pay: true | false,
    userId: number,
    productId: number,
    quantity: number | 0,
    price: number | 0,
    amount: number | 0,
    movementDate: string
}