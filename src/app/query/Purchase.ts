'use server'


import prisma from "@/lib/prisma"
import { Purchase } from "../data/models/Purchase"


export async function createPurchase(data: Purchase) {
  const result = await prisma.purchase.create({ data })
  if (result) {
    return true
  }
}
