import { Prisma } from "@prisma/client";

export const returnOrder: Prisma.orderSelect = {
  idOrder:true,
  address: true,
  order_creation_date: true,
  sum: true,
  courier: {
    select: {
      idCourier: true,
      full_name: true,
      phone: true
    }
  },
  client: {
    select: {
      idClient: true,
      full_name: true,
      address: true,
      phone: true
    }
  }
}