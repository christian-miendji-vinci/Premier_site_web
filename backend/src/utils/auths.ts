import jwt from "jsonwebtoken" ;
import { readOneUserFromUsername } from "../services/users" ;
import { NextFunction, RequestHandler, Response } from "express";
import  type {AutenticatedRequest , User , JwtPayload} from "../../types" ;

const jwtsecret = "ilovemycode";

const authorize = (
    req: AutenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    const token = req.get("authorisation") ;
    if(!token) {
        return res.sendStatus(401) ;
    }

    
}