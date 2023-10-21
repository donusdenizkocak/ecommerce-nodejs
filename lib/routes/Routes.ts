import { Request, Response } from "express";
import { LoginModel } from "models/LoginModel";
import { users } from "../mocData/users";
import { UserModel } from "models/UserModel";
import { products } from "../mocData/product";
import { ProductModel } from "models/ProductModel";
import { baskets } from "../mocData/basket";
import { MovementModel } from "models/MovementModel";
import multer = require('multer');
const upload = multer({ dest: 'file/' });

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
                res.status(200).send(baskets.filter((k: MovementModel) => k.isDelete === false))
            })
        app.route('/add-basket/:id/:quantity')
            .get((req: Request, res: Response) => {
                const productId: number = Number(req.params.id);
                const quantity: number = Number(req.params.quantity);
                const product: ProductModel = products
                    .find((k: ProductModel) => {
                        return k.id === productId
                    })

                product.quantity -= quantity

                const newBasket: MovementModel = {
                    id: baskets.length + 1,
                    pay: false,
                    userId: 1,
                    productId: productId,
                    quantity: quantity,
                    price: product.discountPrice,
                    amount: quantity * product.discountPrice,
                    movementDate: "2023-10-18",
                    isDelete: false,
                }

                baskets.push(newBasket)

                res.status(200).send(baskets)
            })
        app.route('/basket/:id?')
            .delete((req: Request, res: Response) => {
                const movementId: number = Number(req.params.id);

                const deleteBaskets = baskets.map((k: MovementModel) => {
                    if (movementId) {
                        if (movementId === k.id) k.isDelete = true
                    } else {
                        k.isDelete = true
                    }
                    return k
                })

                res.status(200).send(deleteBaskets)
            })
        app.route('/change-basket/:movementId/:quantity')
            .get((req: Request, res: Response) => {
                const movementId: number = Number(req.params.movementId);
                const quantity: number = Number(req.params.quantity);

                const movement = baskets.find((k: MovementModel) => k.id === movementId)

                if (movement) {
                    const product = products
                        .find((z: ProductModel) => z.id === movement.productId);
                    const newQuantity: number = (movement.quantity + product.quantity) - quantity

                    if (newQuantity >= 0) {
                        product.quantity = newQuantity
                        const changeBaskets = baskets.map((k: MovementModel) => {
                            if (movementId === k.id) {
                                k.quantity = quantity
                                k.amount = k.price * quantity
                            }
                            return k
                        })
                        res.status(200).send(changeBaskets)
                    } else {
                        res.status(400).send('stok sınırını açtınız. yeni stok giriniz.')
                    }
                } else {
                    res.status(404).send('geçerli hareket bulunamadı')
                }
            })
        app.route('/payment')
            .get((req: Request, res: Response) => {
                const payment: Array<MovementModel> = baskets
                    .map((k: MovementModel) => {
                        k.pay = true
                        return k
                    })
                res.status(200).send(payment)
            })
        app.route('/file-upload', upload.single('file'))
            .post((req: Request, res: Response) => {
                console.log(req);

                res.status(200).send('file-upload')
            })
    }
}