import { Request, Response } from "express";
import { LoginModel } from "models/LoginModel";
import { users } from "../mocData/users";
import { UserModel } from "models/UserModel";
import { products } from "../mocData/product";
import { ProductModel } from "models/ProductModel";
import { baskets } from "../mocData/basket";
import { MovementModel } from "models/MovementModel";
const multer  = require('multer')
const upload = multer({ dest: 'file-upload/' })

export class Routes {
    public routes(app): void {
        app.route('/users')
            .get((req: Request, res: Response) => {
                res.status(200).send(users)
            })

        app.route('/user/:id')
            .get((req: Request, res: Response) => {
                const id = Number(req.params.id)
                const user = users.find((k: UserModel) => k.id === id);

                res.status(200).send(user)
            })

        app.route('/login')
            .post((req: Request, res: Response) => {
                const { email, password }: LoginModel = req.body;

                const user = users.find((k: UserModel) => k.email === email);

                res.status(200).send({
                    message: "home",
                    user
                })
            })
        app.route('/products')
            .get((req: Request, res: Response) => {
                res.status(200).send(products)
            })
        app.route('/products')
            .post((req: Request, res: Response) => {
                let newProduct: ProductModel = req.body;

                newProduct.id = products.length + 1;

                products.push(newProduct);
                res.status(200).send(products)
            })
        app.route('/basket')
            .get((req: Request, res: Response) => {
                res.status(200).send(baskets)
            })
        app.route('/add-basket/:id/:quantity')
            .get((req: Request, res: Response) => {
                const productId: number = Number(req.params.id);
                const quantity: number = Number(req.params.quantity);
                const product: ProductModel = products
                    .find((k: ProductModel) => {
                        return k.id === productId
                    })

                const newBasket: MovementModel = {
                    id: baskets.length + 1,
                    pay: false,
                    userId: 1,
                    productId: productId,
                    quantity: quantity,
                    price: product.discountPrice,
                    amount: quantity * product.discountPrice,
                    movementDate: "2023-10-18"
                }

                baskets.push(newBasket)

                res.status(200).send(baskets)
            })
        app.route('/payment')
            .get((req: Request, res: Response) => {
                const payment:Array<MovementModel> = baskets
                .map((k: MovementModel) => {
                    k.pay = true
                    return k
                })
                res.status(200).send(payment)
            })
            app.route('/file-upload')
            .post((req: Request, res: Response) => {
                console.log(req.body)
                res.status(200).send('file-upload')
            })
    }
}