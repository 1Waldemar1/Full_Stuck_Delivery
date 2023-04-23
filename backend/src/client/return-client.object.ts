import { Prisma } from "@prisma/client";

export const returnClient: Prisma.clientSelect = {
  idClient: true,
  full_name: true,
  address: true,
  phone: true
}