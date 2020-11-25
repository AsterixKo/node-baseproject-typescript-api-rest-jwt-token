import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config.json';
import { User } from '../models/user.model';

class AuthController {

    public async index(req: Request, res: Response) {


        //checkeamos que existe el email y password en la tabla de usuarios
        const usuario = await User.findOne({
            where: {
                email: req.body.email,
                password: req.body.password
            }
        });

        console.log('usuario:', usuario);
        if (usuario) {
            // recordar que pasamos por post el email
            const token = jwt.sign(
                {
                    email: req.body.email,
                    password: req.body.password
                },
                config.jwtSecret,
                { expiresIn: "1h" }
            );

            res.send(token);
        } else {
            res.sendStatus(404);
        }


    }

}

export const authController = new AuthController();