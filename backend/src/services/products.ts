import path from "node:path";
import { Products, NewProduct } from "../../types";
import { parse, serialize } from "../utils/json";
const jsonDbpath = path.join(__dirname, "/../data/products.json");

const defaultsProducts: Products[] = [
  {
    id: 1,
    price: 397,
    image:
      "https://images.itnewsinfo.com/commun/nouveauxproduits/moyen/000000009880.jpg",
    description: "Les Mini-PC",
    quantityAvailable: 3,
  },
  {
    id: 2,
    price: 450,
    image:
      "https://images.itnewsinfo.com/commun/nouveauxproduits/moyen/000000010542.jpg",
    description: "Acer Switch 12 S",
    quantityAvailable: 14,
  },
  {
    id: 3,
    price: 240,
    image:
      "https://images.itnewsinfo.com/commun/nouveauxproduits/moyen/000000009147.png",
    description: "DarkFighter DS-2DF82231",
    quantityAvailable: 4,
  },
  {
    id: 4,
    price: 1000,
    image:
      "https://images.itnewsinfo.com/commun/nouveauxproduits/moyen/000000008125.jpg",
    description: "Lenovo ThinkServer RS140",
    quantityAvailable: 27,
  },
  {
    id: 5,
    price: 67,
    image:
      "https://images.itnewsinfo.com/commun/nouveauxproduits/moyen/000000007995.png",
    description: "La Camera Panasonic WV-SW115",
    quantityAvailable: 8,
  },
];

export function readAllProduct(): Products[] {
  const products = parse(jsonDbpath, defaultsProducts);
  return products;
}

export function readOneProduct(id: number): Products | undefined {
  const products = parse(jsonDbpath, defaultsProducts);
  const product = products.find((product) => product.id === id);

  if (!product) {
    return undefined;
  }
  return product;
}

export function createOneProduct(newProduct: NewProduct): Products {
  const products = parse(jsonDbpath, defaultsProducts);

  const nextId =
    products.reduce(
      (maxId, product) => (product.id > maxId ? product.id : maxId),
      0
    ) + 1;
  const createProduct = {
    id: nextId,
    ...newProduct,
  };
  products.push(createProduct);
  serialize(jsonDbpath, products);
  return createProduct;
}

export function deleteOneProduct(productId: number): Products | undefined {
  const products = parse(jsonDbpath, defaultsProducts);
  const index = products.findIndex((product) => product.id === productId);
  if (index === -1) {
    return undefined;
  }
  const [deletedProduct] = products.splice(index, 1);
  serialize(jsonDbpath, products);
  return deletedProduct;
}

export function updateOneProduct(
  productId: number,
  newProduct: Partial<NewProduct>
): Products | undefined {
  const products = parse(jsonDbpath, defaultsProducts);
  const product = products.find((product) => product.id === productId);

  if (!product) {
    return undefined;
  }
  if (newProduct.price !== undefined) {
    product.price = newProduct.price!; // the router already checks for the presence of price
  }
  if (newProduct.description !== undefined) {
    product.description = newProduct.description!;
  }
  if (newProduct.image !== undefined) {
    product.image = newProduct.image!;
  }
  if (newProduct.quantityAvailable !== undefined) {
    product.quantityAvailable = newProduct.quantityAvailable!;
  }

  serialize(jsonDbpath, products);
  return product;
}
