import { Prisma } from "@prisma/client";

export const returnListOfProducts: Prisma.list_of_productsSelect = {
  idList_of_products: true,
  quantity: true,
  product: {
    select: {
      idProduct: true,
      name: true,
      price: true
    }
  },
  order: {
    select: {
      idOrder: true,
      address: true,
      order_creation_date: true,
      sum: true
    }
  }
}