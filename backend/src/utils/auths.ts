import jwt from "jsonwebtoken" ;
import { readOneUserFromUsername } from "../services/users" ;
import { NextFunction, RequestHandler, Response } from "express";
import type {AutenticatedRequest , User , JwtPayload} from "../../types" ;

const jwtsecret = "ilovemycode!";

const authorize = (
    req: AutenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    const token = req.get("authorisation") ;
    if(!token) {
        return res.sendStatus(401) ;
    }

    try {
        const decoded = jwt.verify(token , jwtsecret) as JwtPayload ;
        const { username } = decoded ;

        const existingUser = readOneUserFromUsername(username) ;

        if(!existingUser) {
            return res.sendStatus(401) ;
        }
        req.user = existingUser ;
        return next() ;

    } catch (err) {
        console.log("Authorise:" , err);
        return res.sendStatus(401) ;
        
    }
} ;

const isAdmin : RequestHandler = (req: AutenticatedRequest, res , next) => {
    const { username } = req.user as User ;

    if(username !== "admin") {
        return res.sendStatus(403) ;
    }
    return next() ;
} ;

export { authorize , isAdmin} ;