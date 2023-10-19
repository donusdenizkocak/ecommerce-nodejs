export interface AddressModel {
    id: number,
    userId: number,
    type: 'is' | 'ev',
    addressLine: string,
    postCode: string,
    district: string,
    city: string,
    country: string,
}