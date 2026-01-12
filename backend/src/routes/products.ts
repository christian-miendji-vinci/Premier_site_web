import { Router } from "express";
import {  NewProduct } from "../../types";
import {
  readAllProduct,
  readOneProduct,
  createOneProduct,
  deleteOneProduct,
  updateOneProduct,
} from "../services/products";
import { authorize, isAdmin } from "../utils/auths";
const router = Router();

router.get("/error", (_req, _res, _next) => {
  throw new Error("This is an error");
  // equivalent of next(new Error("This is an error"));
});

router.get("/", (_req, res) => {
  const allProducts = readAllProduct();
  return res.json(allProducts);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = readOneProduct(id);
  if (!product) return res.sendStatus(404);
  return res.json(product);
});

router.post("/", authorize , isAdmin , (req , res) => {
    const body : unknown = req.body;
    if(
        !body ||
        typeof body !== "object" ||
        !("price" in body) ||
        !("image" in body) ||
        !("description" in body) ||
        !("quantityAvailable" in body) ||
        typeof body.price !== "number" ||
        typeof body.image !== "string" ||
        typeof body.description !== "string" ||
        typeof body.quantityAvailable !== "number" ||
        !body.image.trim() ||
        !body.description.trim() ||
        body.price <= 0 ||
        body.quantityAvailable < 0
    ){
        return res.sendStatus(400) ;
    }
    const {price , image , description , quantityAvailable} = body as NewProduct;
    const addedProduct = createOneProduct({price , image , description , quantityAvailable}) ;

    return res.json(addedProduct) ;
}) ;

router.delete("/:id", authorize, isAdmin, (req, res) => {
  const id = Number(req.params.id);
  const deletedProduct = deleteOneProduct(id);
  if (!deletedProduct) return res.sendStatus(404);

  return res.json(deletedProduct);
});

router.patch("/:id", authorize , isAdmin , (req , res) => {
    const body : unknown = req.body;
    if(
        !body ||
        typeof body !== "object" ||
        !("price" in body) ||
        !("image" in body) ||
        !("description" in body) ||
        !("quantityAvailable" in body) ||
        typeof body.price !== "number" ||
        typeof body.image !== "string" ||
        typeof body.description !== "string" ||
        typeof body.quantityAvailable !== "number" ||
        !body.image.trim() ||
        !body.description.trim() ||
        body.price <= 0 ||
        body.quantityAvailable < 0
    ){
        return res.sendStatus(400) ;
    }
    const {price , image , description , quantityAvailable} = body as NewProduct;

    const id = Number(req.params.id);
    const updatedProduct = updateOneProduct(id, {price , image , description , quantityAvailable}) ;

    return res.json(updatedProduct) ;
}) ;

export default router;
