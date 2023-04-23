import { Prisma } from "@prisma/client";

export const returnCourier: Prisma.courierSelect = {
  idCourier: true,
  full_name: true,
  phone: true
}