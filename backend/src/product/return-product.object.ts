import { Prisma } from "@prisma/client";

export const returnProduct: Prisma.productSelect = {
  idProduct: true,
  name: true,
  price: true
}