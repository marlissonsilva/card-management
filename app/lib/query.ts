'use server'
import { prisma } from './prisma'

export async function listPurchase() {
  return await prisma.purchase.findMany()
}
