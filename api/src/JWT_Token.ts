import jwt, { VerifyCallback } from 'jsonwebtoken';
import { errorMessage } from "./errorMessage.js";
import {Response, NextFunction, RequestHandler} from 'express';

const JWT_Token = (req: any, res: Response, next: NextFunction, callBackFunction: () => void) => {
    const token = req.cookies.JWT_token;
    if (!token) {
        return next(errorMessage(401, '請先登入'));
    }
    jwt.verify(token, process.env.JWT ?? 'secretkey', ((err, payload) => {
        if (err) {
            return next(errorMessage(403, 'TOKEN無效，解開JWT失敗'));
        }
        req.userData = payload;
        // next();
        callBackFunction();
    }) as VerifyCallback)
};

export const varifyUser: RequestHandler = (req:any, res, next) => {
    JWT_Token(req, res, next, () => {
        const apiUserId = req.params.id;
        if (req.userData.id === apiUserId || req.userData.isAdmin) {
            next();
        } else {
            next(errorMessage(403, '只能修改個人自己的權限或非管理員'));
        }
    });
}

export const varifyAdmin: RequestHandler = (req:any, res, next) => {
    JWT_Token(req, res, next, () => {
        console.log(req instanceof Request);

        if (req.userData.isAdmin) {
            next();
        } else {
            next(errorMessage(403, '非管理員'));
        }
    });
}