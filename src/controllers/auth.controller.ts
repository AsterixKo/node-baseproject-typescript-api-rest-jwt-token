import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config.json';

class AuthController {

    public async index(req: Request, res: Response) {

        // recordar que pasamos por post el email
        const token = jwt.sign(
            { email: req.body.email },
            config.jwtSecret,
            { expiresIn: "1h" }
        );

        res.send(token);

    }

}

export const authController = new AuthController();