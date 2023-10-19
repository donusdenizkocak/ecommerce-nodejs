export interface ContactModel {
    id: number,
    userId: number,
    type: 'is' | 'ev',
    email: string,
    phone: string,
}