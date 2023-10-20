export interface ProductModel{
    id:number,
    title:string,  //kırk yapraklı kareli defter
    seo:string,   //kırk-yapraklı-kareli-defter
    tag:string,
    keyword:string,
    description:string,
    price:number | 0,
    discountPrice:number | 0,
    quantity:number
}