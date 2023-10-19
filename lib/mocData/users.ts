import { UserModel } from "models/UserModel";

export const users:Array<UserModel>=[
    {id:1,email:"user@gmail.com",password:"12345678", role:"user"},
    {id:2,email:"customer@gmail.com",password:"12345678", role:"customer"},
    {id:3,email:"admin@gmail.com",password:"12345678", role:"admin"}
]